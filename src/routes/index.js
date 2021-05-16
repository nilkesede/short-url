const { Router } = require('express')
const dayjs = require('dayjs')

const router = Router()
const { Url } = require('../models')

module.exports = config => {
  router.get('/:slug', async (req, res) => {
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

  router.post('/', async (req, res) => {
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

  return router
}
