const { Effect } = require('inux')

const POST = Symbol('post')
const SELECT = Symbol('select')
const INIT = Symbol('init')
const GET2 = Symbol('get2')

const post = Effect(POST)
const init = Effect(INIT)
const select = Effect(SELECT)
const get2 = Effect(GET2)

module.exports = {
  POST,
  post,
  SELECT,
  select,
  GET2,
  get2
}

