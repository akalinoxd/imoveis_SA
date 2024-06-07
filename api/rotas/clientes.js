const express = require('express')
const router = express.Router()
const connection = require('../database')
const jwt = require('jsonwebtoken')

// conexão a tabela "clientes"
router.get('/', (req, res) => {
    connection.query(`SELECT * FROM clientes`, (err, results, fields) => {
        res.send(results)
    })
})
// rota para login 
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    connection.query('SELECT * FROM clientes WHERE email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuário no banco de dados' });
      }
  
      if (results.length === 0 || results[0].senha !== senha) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      const token = jwt.sign({ clienteId: results[0].clienteId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  })
// rota para cadastrar clientes
router.post('/cadastrar', (req, res) => {

    const { nome, email, senha, cpf, celular } = req.body

    connection.query(`SELECT * FROM clientes`, (err, results, fields) => {
        let estaPresente = false
        results.forEach(val => {
            if (val.email === email || val.cpf === cpf ) {
                estaPresente = true
            }
        })

        if (estaPresente) {
            res.send({ mensagem: "usuário ja esta cadastrado" })
        } else {
            connection.query(
                'INSERT INTO clientes (nome, email, senha, cpf, celular) VALUES (?, ?, ?, ?, ?)', [nome, email, senha, cpf, celular], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    const newId = result.insertId
                    res.send({ userID: newId, nome, email, senha, cpf, celular })
                }
            )
        }
    })
})

// Rota para buscar po email 
router.get('/busca', (req, res) => {
    const { email } = req.query

    if (!email) {
        return res.status(400).json({error: 'Parametro email é obrigatorio' })
    }

    connection.query('SELECT * FROM clientes WHERE email = ?', [email], ( err, results) => {
        if (err) {
            console.error('Erro ao buscar por cleientes:', err)
            return res.status(500).json({error: 'Erro ao buscar por cleientes'})
        }
        if (results.length === 0) {
            return res.status(500).json({ error: 'Nenhum cliente cadastrado com este email'})
        }

        res.status(200).json(results)
    })
})
module.exports = router