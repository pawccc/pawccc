use std::sync::Arc;

use dashmap::DashMap;
use futures_util::{SinkExt, StreamExt};
use hkdf::Hkdf;
use josekit::{
    jwe::alg::direct::{DirectJweAlgorithm, DirectJweDecrypter},
    jwt::{self, JwtPayload},
};
use serde::{Deserialize, Serialize};
use sha2::Sha256;
use sqlx::{Pool, Postgres, postgres::PgPoolOptions, types::time::PrimitiveDateTime};
use tokio::{
    net::{TcpListener, TcpStream, ToSocketAddrs},
    sync::mpsc,
};
use tokio_tungstenite::{
    accept_hdr_async_with_config,
    tungstenite::{
        self, Message,
        handshake::server::{ErrorResponse, Request, Response},
        http::StatusCode,
        protocol::WebSocketConfig,
        extensions::{ExtensionsConfig, compression::deflate::DeflateConfig},
    },
};

#[tokio::main]
async fn main() {
    let server = Server::new().await;
    server.listen("127.0.0.1:8080").await
}

#[derive(Clone)]
struct Server {
    jwe_decrypter: DirectJweDecrypter,
    postgres_pool: Pool<Postgres>,

    clients_by_chat: DashMap<i64, Vec<mpsc::Sender<Arc<ClientEvent>>>>,
}

impl Server {
    async fn new() -> Arc<Self> {
        let ikm = std::env::var("AUTH_SECRET").unwrap();
        let salt = b"authjs.session-token";
        let info = b"Auth.js Generated Encryption Key (authjs.session-token)";

        let hk = Hkdf::<Sha256>::new(Some(salt), ikm.as_bytes());
        let mut okm = [0u8; 64];
        hk.expand(info, &mut okm).unwrap();

        let jwe_decrypter = DirectJweAlgorithm::Dir.decrypter_from_bytes(okm).unwrap();

        let postgres_pool = PgPoolOptions::new()
            .max_connections(4)
            .connect(std::env::var("DATABASE_URL").unwrap().as_str())
            .await
            .unwrap();

        Arc::new(Self {
            jwe_decrypter,
            postgres_pool,

            clients_by_chat: Default::default(),
        })
    }

    async fn listen(self: Arc<Self>, addr: impl ToSocketAddrs) {
        let listener = TcpListener::bind(addr).await.unwrap();
        self.accept(listener).await;
    }

    async fn accept(self: Arc<Self>, listener: TcpListener) {
        while let Ok((stream, _)) = listener.accept().await {
            tokio::spawn(self.clone().handle(stream));
        }
    }

    async fn handle(self: Arc<Self>, stream: TcpStream) {
        let mut session_token: Option<JwtPayload> = None;

        let mut ws_config = WebSocketConfig::default();
        ws_config.extensions = ExtensionsConfig::default();
        ws_config.extensions.permessage_deflate = Some(DeflateConfig::default());
        let mut ws_stream = accept_hdr_async_with_config(
            stream,
            |request: &Request, response: Response| -> Result<Response, ErrorResponse> {
                let cookies = request
                    .headers()
                    .get(tungstenite::http::header::COOKIE)
                    .ok_or(
                        Response::builder()
                            .status(StatusCode::BAD_REQUEST)
                            .body(None)
                            .unwrap(),
                    )?;
                let cookies = cookies.to_str().or(Err(Response::builder()
                    .status(StatusCode::BAD_REQUEST)
                    .body(None)
                    .unwrap()))?;
                for cookie in cookies.split(';') {
                    let cookie = cookie.trim();
                    let Some((name, value)) = cookie.split_once('=') else {
                        continue;
                    };
                    if name == "authjs.session-token" {
                        session_token = Some(
                            jwt::decode_with_decrypter(value, &self.jwe_decrypter)
                                .or(Err(Response::builder()
                                    .status(StatusCode::BAD_REQUEST)
                                    .body(None)
                                    .unwrap()))?
                                .0,
                        );
                    }
                }

                Ok(response)
            },
            Some(ws_config),
        )
        .await
        .unwrap();

        let user: i64 = session_token
            .unwrap()
            .claim("sub")
            .unwrap()
            .as_str()
            .unwrap()
            .parse()
            .unwrap();

        let (tx, mut rx) = mpsc::channel(32);

        let chats = sqlx::query!(
            r#"SELECT chat FROM chat_participant WHERE "user" = $1"#,
            user
        )
        .fetch_all(&self.postgres_pool)
        .await
        .unwrap();
        for chat in chats {
            self.clients_by_chat
                .entry(chat.chat)
                .or_insert_with(Default::default)
                .push(tx.clone());
        }
        tx.send(Arc::new(ClientEvent::Chat {
            id: 0,
            messages: vec![],
        }))
        .await
        .unwrap();

        loop {
            tokio::select! {
                event = rx.recv() => {
                    if let Some(event) = event {
                        ws_stream
                            .send(Message::text(
                                serde_json::to_string(event.as_ref()).unwrap(),
                            ))
                            .await
                            .unwrap();
                    }
                }
                message = ws_stream.next() => {
                    if let Some(Ok(Message::Text(message))) = message {
                        let event: ServerEvent = serde_json::from_str(&message).unwrap();
                        match event {
                            ServerEvent::OpenChat { id } => {
                                let chat_messages = sqlx::query_as!(
                                    ChatMessage,
                                    r#"SELECT id, "user", date, text FROM chat_message WHERE chat = $1"#,
                                    id,
                                )
                                .fetch_all(&self.postgres_pool)
                                .await
                                .unwrap();

                                let event = ClientEvent::Chat { id, messages: chat_messages };
                                ws_stream
                                    .send(Message::text(
                                        serde_json::to_string(&event).unwrap(),
                                    ))
                                    .await
                                    .unwrap();
                            }
                            ServerEvent::SendChat { id, text } => {
                                let chat_message = sqlx::query_as!(
                                    ChatMessage,
                                    r#"INSERT INTO chat_message (chat, "user", text) VALUES ($1, $2, $3) RETURNING id, "user", date, text"#,
                                    id,
                                    user,
                                    text
                                )
                                .fetch_one(&self.postgres_pool)
                                .await
                                .unwrap();

                                let event = Arc::new(ClientEvent::Chat {
                                    id,
                                    messages: vec![chat_message],
                                });
                                for client in self.clients_by_chat.get(&id).unwrap().value() {
                                    client.send(event.clone()).await.unwrap();
                                }
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "event")]
enum ServerEvent {
    OpenChat { id: i64 },
    SendChat { id: i64, text: String },
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "event")]
enum ClientEvent {
    Chat { id: i64, messages: Vec<ChatMessage> },
}

#[derive(Debug, Serialize, Deserialize)]
struct ChatMessage {
    id: i64,
    user: i64,
    date: Option<PrimitiveDateTime>,
    text: String,
}
