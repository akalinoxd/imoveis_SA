const express = require('express')
const router = express.Router()
const connection = require('../database')
const authCliente = require('../middleware/authCliente')
const nodemailer = require('nodemailer');
require('dotenv').config()

//Configuração do nodemailer
const transporter = nodemailer.createTransport({
   host: 'smtp.office365.com',
   port: 587,
   secure: false,
    auth: {
        user: 'juninhojoga1038@hotmail.com',
        pass: '102030405060'
    }
})

// função para enviar e-mail
function enviarEmail(corpoImovel, corpoCliente, dataVisita ) {
    const mailOptions = {
        from: 'juninhojoga1038@hotmail.com',
        to: 'juninhojoka11@gmail.com',
        subject: 'Solicitação de visita',
        html: `
            <p> Olá</p>
            <p>O cliente solicitou uma visita para o seguinte imóvel:</p>
            <pre>${corpoImovel}</pre>
            <p>Aqui estão algumas informações do cliente:</p>
            <pre>${corpoCliente}</pre>
            <p>A visita está agendada para a data ${dataVisita}.</p>
        `
    }

    transporter.sendMail(mailOptions,(error, info) => {
        if(error){
            console.error('Erro ao enviar email:', error)
        } else {
            console.log('Email enviado com sucesso:', info.response)
        }
    })
}

// Rota para verificar a disponibilidade e agendar visita 
router.post('/', authCliente, (req, res) => {
    const {imoveisID, data_visita} = req.body
    const clienteId = req.clienteId

    const sql = ` INSERT INTO visitas (clienteId, imoveisID, data_visita) VALUES (?, ?, ?)`

    connection.query(sql, [ clienteId, imoveisID, data_visita], (err, results) => {
        if (err) {
            console.error('Erro ao agendar a visita: ', err)
            return res.status(500).json({error: 'Erro ao agendar a visita'})
        }
    // Após o agendamento buscando informações para enviar o email
    const consultaImovel = `
        SELECT *
        FROM imoveis
        WHERE imoveisID = ?
    `;
    connection.query(consultaImovel, [imoveisID], (err, resultsImovel) => {
        if (err) {
            console.error('Erro ao buscar informações no imóvel:', err)
            return req.status(500).json({ error: 'Erro ao buscar informações no imóvel'})
        }

        const consultaCliente = `
            SELECT * 
            FROM clientes
            WHERE clienteId = ?
        `
    connection.query(consultaCliente, [ clienteId ], (err, resultsCliente) => {
        if (err) {
            console.error('Erro ao buscar inforamções do cliente')
            return res.status(500).json({error:'Erro ao buscar inforamções do cliente'})
        }
        if (resultsImovel.length > 0 && resultsCliente.length > 0) {
            const corpoImovel = JSON.stringify(resultsImovel[0], null, 2);
            const corpoCliente = JSON.stringify(resultsCliente[0], null, 2)

            // Enviar email de agendamento de visita
            enviarEmail(process.env.EMAIL_DESTINATARIO, corpoImovel, corpoCliente, data_visita)

            res.json({ message: 'Visita agendada com sucesso ' })
        } else {
            res.status(404).json({error:'Imóvel ou cliente não encontrado '})
        }
    })
    })      
    })
})
module.exports = router