const dayjs = require('dayjs')

const { Url } = require('../models')
const config = require('../config')
const { isValidURL } = require('../lib/utils')
const { BadRequestError } = require('../lib/errors')
const Service = require('../lib/Service')

class Generator extends Service {
  async doAction() {
    const { url } = this.req.body

    if (!isValidURL(url)) {
      throw new BadRequestError('URL inválida!')
    }

    const urlCreated = await Url.findOne(
      {
        url,
        created: {
          $gt: dayjs().subtract(1, 'M')
        }
      },
      'slug',
      {
        sort: {
          created: -1
        }
      }
    )

    if (urlCreated) {
      return {
        url: `${config.BASE_URL}/${urlCreated.slug}`
      }
    }

    const newUrl = await Url.create({ url })

    return {
      url: `${config.BASE_URL}/${newUrl.slug}`
    }
  }
}

module.exports = (...params) => Generator.execute(...params)
