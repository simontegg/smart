window.mydebug = require('debug')
mydebug.enable('*')
const debug = require('debug')('client:index')
const { start, html } = require('inu')
const { App, Domain, Action, run } = require('inux')
const extend = require('xtend')
const pull = require('pull-stream')
const drain = require('pull-stream/sinks/drain')
const map = require('pull-stream/throughs/map')

// const { SET } = require('./actions')
const { POST } = require('./effects')
const formView = require('./views/form')
const api = require('./api')


const documents = api.service('documents') 

const form = Domain({
  name: 'form',
  run: {
    [POST]: (formData) => {
      document.querySelector('#url-input').value = ''
      documents.create(formData)
    },
  },
  routes: [
    ['/', (params, model, dispatch) => formView(model.form, dispatch)]
  ]
})

const app = App([
  form
])

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main')
  const { views } = start(app)

  pull(
    views(),
    drain(function (view) {
      html.update(main, view)
    })
  )
})


