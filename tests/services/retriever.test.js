const expressMock = require('express-request-mock')

const generator = require('../../services/generator')
const retriever = require('../../services/retriever')

describe('URL endpoints', () => {
  const url = 'https://nilkesede.sh'
  let generatedUrl

  beforeAll(async () => {
    const { res } = await expressMock(generator, { body: { url } })
    const data = res._getData()
    generatedUrl = data.url
  })

  it('should redirects to the original url', async () => {
    const slug = generatedUrl.split('/').pop()
    const { res } = await expressMock(retriever, {
      query: { slug }
    })
    const redirectUrl = res._getRedirectUrl()

    expect(redirectUrl).toEqual(url)
    expect(res.statusCode).toEqual(301)
  })

  it('should requires a slug as parameter', async () => {
    const { res } = await expressMock(retriever)
    const data = res._getData()

    expect(res.statusCode).toEqual(400)
    expect(data.message).toEqual('URL inválida!')
  })

  it('should requires created url', async () => {
    const { res } = await expressMock(retriever, {
      query: { slug: 'notaslug' }
    })
    const data = res._getData()

    expect(res.statusCode).toEqual(404)
    expect(data.message).toEqual('URL não encontrada!')
  })
})
