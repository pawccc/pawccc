SELECT nextval('version'); -- first call inits the sequence
SELECT nextval('version');

CREATE TABLE "user"
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    email      TEXT NOT NULL,
    username   TEXT NOT NULL,
    password   TEXT
);

CREATE TABLE user_otp
(
    id         BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    "user"     BIGINT    NOT NULL
        REFERENCES "user",
    password   TEXT      NOT NULL,
    expires_at TIMESTAMP NOT NULL
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
        REFERENCES "user"
);

CREATE TABLE chat_message
(
    id          BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    participant BIGINT NOT NULL
        REFERENCES chat_participant,
    date        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    text        TEXT   NOT NULL
);
