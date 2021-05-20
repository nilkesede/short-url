import MongoMemoryServer from 'mongodb-memory-server'

const mongo = new MongoMemoryServer.MongoMemoryServer()
process.env.DB_CONNECTION = await mongo.getUri()
