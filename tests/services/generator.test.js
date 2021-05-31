const expressMock = require('express-request-mock')
const MockDate = require('mockdate')
const dayjs = require('dayjs')

const generator = require('../../services/generator')

describe('Short url generator', () => {
  const url = 'https://nilkesede.sh'
  let generatedUrl

  it('should requires a valid url as parameter', async () => {
    const { res } = await expressMock(generator, {
      body: { url: 'invalid.url' }
    })
    const data = res._getData()

    expect(res.statusCode).toEqual(400)
    expect(data.message).toEqual('URL inválida!')
  })

  it('should create a new short url with success', async () => {
    const { res } = await expressMock(generator, { body: { url } })
    const data = res._getData()
    generatedUrl = new URL(data.url)

    expect(res.statusCode).toEqual(200)
  })

  it('should create a short url with 10 chars slug', () => {
    expect(generatedUrl.pathname).toMatch(/^\/(.{10})$/)
  })

  it('should create a short url with alphanumerical slug', () => {
    expect(generatedUrl.pathname).toMatch(/^\/[0-9a-zA-Z]{10}$/)
  })

  it('should return url created previously', async () => {
    const { res } = await expressMock(generator, { body: { url } })
    const data = res._getData()
    const newUrl = new URL(data.url)

    expect(newUrl.pathname).toEqual(generatedUrl.pathname)
  })

  it('should generate new slug after 1 month', async () => {
    MockDate.set(dayjs().add(1, 'M').add(1, 'd'))

    const { res } = await expressMock(generator, { body: { url } })
    const data = res._getData()
    const newUrl = new URL(data.url)

    expect(newUrl.pathname).not.toEqual(generatedUrl.pathname)

    MockDate.reset()
  })
})
