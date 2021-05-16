const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('ok')
})

server.listen(port)
server.on('listening', () => console.log(`Listening on ${port}`))
server.on('error', error => console.error(error))

module.exports = app
