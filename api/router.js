const express = require('express')
const app = express.Router()

app.use('/imoveis', require('./rotas/imoveis'))
app.use('/visita', require('./rotas/visita'))
app.use('/consultores', require('./rotas/consultores'))
app.use('/clientes', require('./rotas/clientes'))

module.exports = app