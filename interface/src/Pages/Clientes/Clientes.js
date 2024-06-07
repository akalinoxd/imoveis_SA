import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    obterClientes(); // Chamada da função ao montar o componente
  }, []); // Passando um array vazio como segundo argumento para garantir que a função só seja chamada uma vez

  async function obterClientes() {
    try {
      const response = await fetch('http://localhost:3001/clientes');
      if (!response.ok) {
        throw new Error('Erro ao obter clientes');
      }
      const data = await response.json();
      console.log(data); // Exibe a resposta no console do navegador
      setClientes(data); // Define os clientes recebidos do backend no estado
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
      setErro('Erro ao obter clientes. Por favor, tente novamente mais tarde.');
    }
  }

  return (
    <div>
      <h1>Clientes</h1>
      {erro && <p>{erro}</p>}
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            <strong>Nome: </strong>{cliente.nome}<br />
            <strong>Email: </strong>{cliente.email}<br />
            <strong>CPF: </strong>{cliente.cpf}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
