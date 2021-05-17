const { model, Schema, SchemaTypes } = require('mongoose')
const { customAlphabet } = require('nanoid')
const { alphanumeric } = require('nanoid-dictionary')
require('mongoose-type-url')

const nanoid = customAlphabet(alphanumeric, 10)

module.exports = model(
  'Url',
  new Schema({
    url: {
      type: SchemaTypes.Url,
      required: true,
      lowercase: true
    },
    slug: {
      type: String,
      default: nanoid,
      unique: true
    },
    created: {
      type: Date,
      default: Date.now
    }
  })
)
