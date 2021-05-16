const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

module.exports = async config => {
  const app = express()

  await mongoose.connect(config.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(routes(config))

  return app.listen(config.PORT, () => {
    console.log('listening on', config.PORT)
  })
}
