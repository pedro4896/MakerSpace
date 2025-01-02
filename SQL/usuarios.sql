CREATE DATABASE sistema_login;

USE sistema_login;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  login VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  session_token VARCHAR(255) NULL
);

select * from usuarios



