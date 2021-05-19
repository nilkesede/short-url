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

    const { url } = req.body

    if (!url) {
      return res.status(400).send('url inválida')
    }

    const urlCreated = await Url.findOne(
      {
        url,
        created: {
          $gt: dayjs().subtract(1, 'months')
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
      return res.status(200).json({
        newUrl: `${config.BASE_URL}/${urlCreated.slug}`
      })
    }

    const newUrl = await Url.create({ url })

    return res.status(200).send({
      newUrl: `${config.BASE_URL}/${newUrl.slug}`
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Erro ao encurtar url!' })
  } finally {
    mongoose.connection.close()
  }
}
