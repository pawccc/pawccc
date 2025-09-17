CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE FUNCTION random_alphanumeric_string(length INT) RETURNS TEXT
    LANGUAGE plpgsql
AS
$$
BEGIN
    RETURN (SELECT string_agg(substr('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                                     (mod(abs(get_byte(gen_random_bytes(1), 0)), 36) + 1), 1), '')
            FROM generate_series(1, length));
END;
$$;

CREATE TABLE "user"
(
    id            BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY,

    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    email         TEXT      NOT NULL
        UNIQUE,
    username      TEXT      NOT NULL
        UNIQUE,
    password      TEXT,

    passcode      TEXT               DEFAULT random_alphanumeric_string(8),
    passcode_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat
(
    id BIGINT GENERATED ALWAYS AS IDENTITY
        PRIMARY KEY
);

CREATE TABLE chat_participant
(
    id     BIGINT GENERATED ALWAYS AS IDENTITY
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

    chat   BIGINT    NOT NULL
        REFERENCES chat,
    "user" BIGINT    NOT NULL
        REFERENCES "user",
    date   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    text   TEXT      NOT NULL
);
