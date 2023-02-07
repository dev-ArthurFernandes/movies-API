CREATE DATABASE movies;

CREATE TABLE IF NOT EXISTS movies(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT(),
    duration INTEGER(2,1) NOT NULL,
    price INTEGER(3,2) NOT NULL
);


