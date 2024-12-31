CREATE DATABASE sistema_login;

USE sistema_login;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  email VARCHAR(150) NOT NULL,
  login VARCHAR(80) NOT NULL,
  senha varchar(8) NOT NULL
);