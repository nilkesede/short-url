const { Url } = require('../models')
const Service = require('../lib/Service')
const { BadRequestError, NotFoundError } = require('../lib/errors')

class Retriever extends Service {
  async doAction() {
    const { slug } = this.req.query

    if (!slug) {
      throw new BadRequestError('URL inválida!')
    }

    const urlCreated = await Url.findBySlug(slug)

    if (urlCreated) {
      return this.respondWithRedirect(urlCreated.url)
    }

    throw new NotFoundError('URL não encontrada!')
  }
}

module.exports = (...params) => Retriever.execute(...params)
