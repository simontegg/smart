const { Effect } = require('inux')

const POST = Symbol('post')
const INIT = Symbol('init')

const post = Effect(POST)
const init = Effect(INIT)

module.exports = {
  POST,
  post
}

