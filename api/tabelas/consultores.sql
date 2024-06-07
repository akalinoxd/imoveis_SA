USE websiteInfo;

CREATE TABLE IF NOT EXISTS consultores (
  consultorId  INTEGER PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  consultor_email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  cpf VARCHAR(50) NOT NULL,
  celular VARCHAR(25) NOT NULL,
  tipo VARCHAR(25) NOT NULL,
  UNIQUE (consultor_email)
);

INSERT INTO consultores (nome, consultor_email, senha, cpf, celular, tipo) 
VALUES ('Roberto', 'ralves@gmail.com', '123456', '85923791256', '11953486834', 'consultor');

INSERT INTO consultores (nome, consultor_email, senha, cpf, celular, tipo)
VALUES ('Igor', 'rogi@gmail.com', 'senha123', '12345678987', '11948695738', 'consultor');

INSERT INTO consultores (nome, consultor_email, senha, cpf, celular, tipo)
VALUES ('Alana', 'anala@gmail.com', '543210', '76814682347', '11967896547', 'consultor');

INSERT INTO consultores (nome, consultor_email, senha, cpf, celular, tipo)
VALUES ('Miguel', 'leugim@gmail.com', '987654', '98765432146', '11936547826', 'consultor');
