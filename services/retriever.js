const { Url } = require('../models')
const { BadRequestError, NotFoundError } = require('../lib/errors')
const Service = require('../lib/Service')

class Retriever extends Service {
  async doAction() {
    const { slug } = this.req.params || this.req.query

    if (!slug) {
      throw new BadRequestError('URL inválida!')
    }

    const urlCreated = await Url.findOne(
      {
        slug
      },
      'url',
      {
        sort: {
          created: -1
        }
      }
    )

    if (urlCreated) {
      return this.respondWithRedirect(urlCreated.url)
    }

    throw new NotFoundError('URL não encontrada!')
  }
}

module.exports = (...params) => Retriever.execute(...params)
