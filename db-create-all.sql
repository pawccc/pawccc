CREATE TABLE "user"
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    email      TEXT NOT NULL
        UNIQUE,
    username   TEXT NOT NULL
        UNIQUE,
    password   TEXT
);

CREATE TABLE chat
(
    id BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY
);

CREATE TABLE chat_participant
(
    id    BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    chat   BIGINT NOT NULL
        REFERENCES chat,
    "user" BIGINT NOT NULL
        REFERENCES "user",
    UNIQUE (chat, "user")
);

CREATE TABLE chat_message
(
    id     BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    chat   BIGINT NOT NULL
        REFERENCES chat,
    "user" BIGINT NOT NULL
        REFERENCES "user",
    date   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    text   TEXT   NOT NULL
);
