const { Url } = require('../models')
const { BadRequestError, NotFoundError } = require('../lib/errors')
const connectDatabase = require('../lib/connectors/database')

module.exports = async (req, res) => {
  try {
    await connectDatabase()

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
