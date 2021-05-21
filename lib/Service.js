const connectDatabase = require('./connectors/database')

class Service {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  doAction() {
    return 'ok'
  }

  respondWithSuccess(body) {
    return this.res.status(200).send(body)
  }

  respondWithError(error) {
    return this.res
      .status(error.code || 500)
      .send({ message: error.message || 'internal server error' })
  }

  respondWithRedirect(url) {
    return this.res.redirect(301, url)
  }

  static async execute(req, res) {
    const instance = new this(req, res)
    try {
      await connectDatabase()
      const response = await instance.doAction()
      if (response.redirect) {
        return instance.respondWithRedirect(response.url)
      }
      return instance.respondWithSuccess(response)
    } catch (error) {
      return instance.respondWithError(error)
    }
  }
}

module.exports = Service
