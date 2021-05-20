const RequestError = require('./RequestError')

class BadRequestError extends RequestError {
  constructor(message) {
    super(message, 400)
    this.name = 'BadRequestError'
  }
}

module.exports = BadRequestError
