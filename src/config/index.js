const database = require('./database')

const PORT = process.env.PORT || 3000
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`

module.exports = {
  ...database,
  PORT,
  BASE_URL
}
