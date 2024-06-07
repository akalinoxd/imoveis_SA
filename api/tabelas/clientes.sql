USE websiteInfo;

CREATE TABLE IF NOT EXISTS clientes (
  clienteId  INTEGER PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  cpf VARCHAR(50) NOT NULL,
  celular VARCHAR(25) NOT NULL,
  UNIQUE (email)
);

INSERT INTO clientes (nome, email, senha, cpf, celular) 
VALUES ('James', 'teste@gmail.com', '456713', '85674231856', '11953578434');