const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./router')

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/', routes)


app.listen(port, () => { 
   console.log('server started at port ' + port)
})
