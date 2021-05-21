const { model, Schema, SchemaTypes } = require('mongoose')
const { customAlphabet } = require('nanoid')
const { alphanumeric } = require('nanoid-dictionary')
const dayjs = require('dayjs')
require('mongoose-type-url')

const nanoid = customAlphabet(alphanumeric, 10)

const Url = model(
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

async function findOneValidOrCreate(url) {
  const persisted = await Url.findOne(
    {
      url,
      created: {
        $gt: dayjs().subtract(1, 'M')
      }
    },
    'slug',
    {
      sort: {
        created: -1
      }
    }
  )

  if (persisted) {
    return persisted
  }

  return Url.create({ url })
}

function findBySlug(slug) {
  return Url.findOne(
    {
      slug
    },
    'url',
    {
      sort: {
        created: -1
      }
    }
  )
}

module.exports = Object.assign(Url, {
  findOneValidOrCreate,
  findBySlug
})
