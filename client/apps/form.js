const { Domain } = require('inux')
const { POST } = require('../effects')
const formView = require('../views/form')
const api = require('../api')
const debug =require('debug')('form:app')

const documents = api.service('documents')

const form = Domain({
  name: 'form',
  init: () => ({ model: '' }),
  run: {
    [POST]: (formData) => {
      document.querySelector('#url-input').value = ''
      documents.create(formData)
    }
  },
  routes: [
    [
      '/form', 
      (params, model, dispatch) => {
        debug(params, model, dispatch) 
        debug(formView(model.form, dispatch))
        return formView(model.form, dispatch)
      }
    ]
  ]
})

module.exports = form
