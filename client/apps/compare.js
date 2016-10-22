const { Domain } = require('inux')
const { SELECT, GET2, get2 } = require('../effects')
const compareView = require('../views/compare')
const api = require('../api')
const debug = require('debug')('apps:compare')

const sampleService = api.service('sample')

const compare = Domain({
  name: 'compare',
  init: () => ({
    model: {},
    effect: get2()
  }),
  run: {
    [GET2]: (model, sources) => {
      debug('getting')
      console.log('getting')
//      sampleService.find({}, (err, docs) => {
//        if (err) console.error(err)
//        debug(docs) 
//      })
    }
  },
  routes: [
    [
      '/compare', 
      (params, model, dispatch) => {
        return compareView(model.compare, dispatch)
      }
    ]
  ]
})

module.exports = compare
