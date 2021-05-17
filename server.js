const express = require('express')

const makeConfig = require('./config')
const slug = require('./api/[slug]')
const index = require('./api')

module.exports = async () => {
  const config = makeConfig()
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.get('/:slug', slug)
  app.post('/', index)

  return app.listen(config.PORT, () => {
    console.log('listening on', config.PORT)
  })
}
