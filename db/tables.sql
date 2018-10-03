CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
name text
);

CREATE TABLE IF NOT EXISTS pokemon(
id SERIAL PRIMARY KEY,
name text,
img text,
weight text,
height text
);

CREATE TABLE IF NOT EXISTS pokemon_users(
id SERIAL PRIMARY KEY,
user_id integer,
pokemon_id integer
);

