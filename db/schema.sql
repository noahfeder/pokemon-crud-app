DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS pokemon CASCADE;
DROP TABLE IF EXISTS types;



CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR (25) UNIQUE,
  password_hashed VARCHAR NOT NULL
);


CREATE TABLE types(
  type_id SERIAL PRIMARY KEY,
  type_name VARCHAR(10) UNIQUE NOT NULL,
  normal REAL DEFAULT 1.0,
  fire REAL DEFAULT 1.0,
  water REAL DEFAULT 1.0,
  electric REAL DEFAULT 1.0,
  grass REAL DEFAULT 1.0,
  ice REAL DEFAULT 1.0,
  fighting REAL DEFAULT 1.0,
  poison REAL DEFAULT 1.0,
  ground REAL DEFAULT 1.0,
  flying REAL DEFAULT 1.0,
  psychic REAL DEFAULT 1.0,
  bug REAL DEFAULT 1.0,
  rock REAL DEFAULT 1.0,
  ghost REAL DEFAULT 1.0,
  dragon REAL DEFAULT 1.0,
  dark REAL DEFAULT 1.0,
  steel REAL DEFAULT 1.0,
  fairy REAL DEFAULT 1.0
);

CREATE TABLE pokemon(
  poke_id INTEGER PRIMARY KEY,
  poke_name VARCHAR(10) UNIQUE NOT NULL,
  type VARCHAR (10) REFERENCES types(type_name),
  hp INTEGER NOT NULL,
  attack INTEGER NOT NULL,
  defense INTEGER NOT NULL
);




CREATE TABLE teams(
  team_id SERIAL,
  team_name VARCHAR(50) NOT NULL,
  pokemon_1 INTEGER REFERENCES pokemon(poke_id),
  pokemon_2 INTEGER REFERENCES pokemon(poke_id),
  pokemon_3 INTEGER REFERENCES pokemon(poke_id),
  pokemon_4 INTEGER REFERENCES pokemon(poke_id),
  pokemon_5 INTEGER REFERENCES pokemon(poke_id),
  pokemon_6 INTEGER REFERENCES pokemon(poke_id),
  user_id_ref INTEGER REFERENCES users(user_id),
  PRIMARY KEY (team_name, user_id_ref)
);


COPY types
  (type_name,normal,fire,water,electric,grass,
    ice,fighting,poison,ground,flying,psychic,
    bug,rock,ghost,dragon,dark,steel,fairy)
FROM '/Users/stavro510/code/wdi/project2/db/types.csv'
    DELIMITER ';' CSV;

COPY pokemon
  (poke_id, poke_name, type, hp, attack, defense)
FROM '/Users/stavro510/code/wdi/project2/db/pokemon.csv'
  DELIMITER ';' CSV;
