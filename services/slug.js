const mongoose = require('mongoose')
const dayjs = require('dayjs')

const { Url } = require('../models')
const makeConfig = require('../config')

module.exports = async (req, res) => {
  try {
    const config = makeConfig()

    await mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const { slug } = req.params || req.query

    if (!slug) {
      return res.status(400).send('url inválida')
    }

    const urlCreated = await Url.findOne(
      {
        slug,
        created: {
          $gt: dayjs().subtract(1, 'months')
        }
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

    return res.status(404).send({
      message: 'url not found'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Erro ao procurar url!' })
  } finally {
    mongoose.connection.close()
  }
}
