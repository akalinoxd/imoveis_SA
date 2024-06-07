const mysql = require('mysql')

console.log('Começando a conexão com o banco de dados ...')

const connection = mysql.createConnection({
    host: 'database',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'websiteInfo',
})
connection.connect(err => {
    if (err) {
        console.log('Error ao se conectar com o banco de dados:', err)
        process.exit(1)
    }
    return console.log('conectado ao banco de dados !')
})

module.exports = connection