const mongoose = require('mongoose')
const dayjs = require('dayjs')

const { Url } = require('../models')
const config = require('../config')
const { isValidURL } = require('../utils')
const { BadRequestError } = require('../utils/errors')

module.exports = async (req, res) => {
  try {
    await mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const { url } = req.body

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
      return res.status(200).send({
        url: `${config.BASE_URL}/${urlCreated.slug}`
      })
    }

    const newUrl = await Url.create({ url })

    return res.status(200).send({
      url: `${config.BASE_URL}/${newUrl.slug}`
    })
  } catch (error) {
    return res
      .status(error.code || 500)
      .send({ message: error.message || 'Erro ao encurtar url!' })
  }
}
