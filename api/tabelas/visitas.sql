USE websiteInfo

CREATE TABLE IF NOT EXISTS visitas (
    visitaId INTEGER PRIMARY KEY AUTO_INCREMENT,
    clienteId INTEGER ,
    imoveisID INTEGER ,
    data_visita DATETIME NOT NULL,
    status ENUM('agendada', 'realizada', 'cancelada') NOT NULL DEFAULT 'agendada',
    FOREIGN KEY (clienteId) REFERENCES clientes(clienteId),
    FOREIGN KEY (imoveisID) REFERENCES imoveis(imoveisID)
);