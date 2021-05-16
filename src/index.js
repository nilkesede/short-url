const express = require('express')
const mongoose = require('mongoose')

const config = require('./config')

const app = express()
const port = process.env.PORT || 3000

;(async () => {
  try {
    await mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.get('/', (req, res) => {
      res.send('ok')
    })

    app.listen(port, () => {
      console.log('listening on', port)
    })
  } catch (error) {
    console.error(error)
  }
})()
