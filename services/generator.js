const config = require('../config')
const { Url } = require('../models')
const Service = require('../lib/Service')
const { isValidURL } = require('../lib/utils')
const { BadRequestError } = require('../lib/errors')

class Generator extends Service {
  async doAction() {
    const { url } = this.req.body

    if (!isValidURL(url)) {
      throw new BadRequestError('URL inválida!')
    }

    const created = await Url.findOneValidOrCreate(url)

    return {
      url: `${config.BASE_URL}/${created.slug}`
    }
  }
}

module.exports = (...params) => Generator.execute(...params)
