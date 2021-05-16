const { Schema, model } = require('mongoose')

const urlSchema = new Schema({
  original: String,
  slug: String,
  created_at: Date
})

const Url = model('Url', urlSchema)

module.exports = Url
