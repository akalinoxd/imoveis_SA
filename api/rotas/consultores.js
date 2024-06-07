const express = require('express')
const router = express.Router()
const connection = require('../database')
const jwt = require('jsonwebtoken')
const authconsultor = require('../middleware/authConsultor')
//const dotenv = require('dotenv')

//dotenv.config()

// conexão a tabela "consultor"
router.get('/', (req, res) => {
    connection.query(`SELECT * FROM consultores`, (err, results, fields) => {
        res.send(results)
    })
})
// rota para login de consultor
router.post('/login', (req, res) => {
    const { consultor_email, senha } = req.body;
  
    connection.query('SELECT * FROM consultores WHERE consultor_email = ?', [consultor_email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar consultor no banco de dados' });
      }
  
      if (results.length === 0 || results[0].senha !== senha) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
  
      const token = jwt.sign({ consultorId: results[0].consultorId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  })
// rota para cadastrar consultores
router.post('/cadastrar', (req, res) => {

    const { nome, consultor_email, senha, cpf, celular } = req.body

    connection.query(`SELECT * FROM consultores`, (err, results, fields) => {
        let estaPresente = false
        results.forEach(val => {
            if (val.consultor_email === consultor_email || val.cpf === cpf ) {
                estaPresente = true
            }
        })

        if (estaPresente) {
            res.send({ mensagem: "usuário ja esta cadastrado" })
        } else {
            connection.query(
                'INSERT INTO consultores (nome, consultor_email, senha, cpf, celular) VALUES (?, ?, ?, ?, ?)', [nome, consultor_email, senha, cpf, celular], (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    const newId = result.insertId
                    res.send({ userID: newId, nome, consultor_email, senha, cpf, celular })
                }
            )
        }
    })
})
//
router.get('/busca', (req, res) => {
    const { consultor_email } = req.query

    if (!consultor_email) {
        return res.status(400).json({error: 'Parametro email é obrigatorio' })
    }

    connection.query('SELECT * FROM consultores WHERE consultor_email = ?', [consultor_email], ( err, results) => {
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
// Rota para buscar imóveis por cliente (apenas para o consultor autenticado) 
router.get('/meus-imoveis', authconsultor, (req, res) => {

    const consultorId = req.consultorId

    if(consultorId == undefined){
        return {mensagem: "O usuário não tem permissão para cadastrar um imóvel"}
    }

    connection.query('SELECT * FROM imoveis WHERE consultorId = ?', [consultorId], ( err, results) => {
        if (err) {
            console.error('Erro ao buscar imóveis:', err)
            return res.status(500).json({error: 'Erro ao buscar imóveis'})
        }
        if (results.length === 0) {
            return res.status(500).json({ error: 'Nenhum imóvel cadastrado para este cliente'})
        }

        res.status(200).json(results)
    })
})

module.exports = router