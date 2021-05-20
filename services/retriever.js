const mongoose = require('mongoose')

const { Url } = require('../models')
const config = require('../config')
const { BadRequestError, NotFoundError } = require('../utils/errors')

module.exports = async (req, res) => {
  try {
    await mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const { slug } = req.params || req.query

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
      return res.redirect(301, urlCreated.url)
    }

    throw new NotFoundError('URL não encontrada!')
  } catch (error) {
    return res
      .status(error.code || 500)
      .send({ message: error.message || 'Erro ao procurar url!' })
  }
}
