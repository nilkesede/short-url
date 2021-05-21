const mongoose = require('mongoose')
const config = require('../../config')

module.exports = () => {
  return mongoose.connect(config.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
