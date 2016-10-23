const { Domain } = require('inux')
const { POST_SIMILARITY } = require('./effects')
const similarityView = require('./view')
const api = require('../api')
const debug = require('debug')('similarity:app')

const similarityService = api.service('similarities')

const form = Domain({
  name: 'similarity',
  init: () => ({ model: '' }),
  run: {
    [POST_SIMILARITY]: (formData) => {
      debug(formData)
      document.querySelector('#url-input-a').value = ''
      document.querySelector('#url-input-b').value = ''
      similarityService.find({ query: formData }, (err, result) => {
        debug('result', err, result)
      })
    }
  },
  routes: [
    [
      '/similarity', 
      (params, model, dispatch) => {
        debug(params, model, dispatch) 
        return similarityView(model.similarity, dispatch)
      }
    ]
  ]
})

module.exports = form
