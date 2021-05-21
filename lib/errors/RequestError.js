class RequestError extends Error {
  constructor(message, code = 500) {
    super(message)
    this.code = code
    this.name = 'RequestError'
  }
}

module.exports = RequestError
