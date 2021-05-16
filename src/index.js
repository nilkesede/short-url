const express = require('express')
const mongoose = require('mongoose')
const dayjs = require('dayjs')

const config = require('./config')
const { Url } = require('./models')

const app = express()
const port = config.PORT

;(async () => {
  try {
    await mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.get('/:slug', async (req, res) => {
      try {
        const { slug } = req.params

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
      }
    })

    app.post('/', async (req, res) => {
      try {
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
      }
    })

    app.listen(port, () => {
      console.log('listening on', port)
    })
  } catch (error) {
    console.error(error)
  }
})()
