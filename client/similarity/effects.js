const { Effect } = require('inux')

const POST_SIMILARITY = Symbol('post')

const postSimilarity = Effect(POST_SIMILARITY)

module.exports = {
  POST_SIMILARITY,
  postSimilarity
}

