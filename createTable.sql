CREATE DATABASE movies;

CREATE TABLE IF NOT EXIST mymovies(
    id BIGSIREAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    duration NUMERIC(2,1) NOT NULL,
    price NUMERIC(3,2) NOT NULL
);


