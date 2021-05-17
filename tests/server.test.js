const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const startServer = require('../server')

let app

beforeAll(async () => {
  const mongo = new MongoMemoryServer()
  process.env.DB_CONNECTION = await mongo.getUri()
  app = await startServer()
})

afterAll(() => {
  app.close()
})

describe('URL endpoints', () => {
  const originalUrl = 'https://google.com'
  let newUrl

  it('should create a new short url', async () => {
    const res = await request(app).post('/').send({
      url: originalUrl
    })
    expect(res.body.newUrl).toBeDefined()
    expect(res.statusCode).toEqual(200)
    newUrl = res.body.newUrl
  })

  it('should redirect short url to original url', async () => {
    const slug = newUrl.split('/').pop()
    const res = await request(app).get(`/${slug}`)
    expect(res.redirect).toBeTruthy()
    expect(res.header.location).toEqual(originalUrl)
    expect(res.statusCode).toEqual(301)
  })
})
