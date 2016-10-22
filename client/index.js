window.mydebug = require('debug')
mydebug.enable('*')
const debug = require('debug')('client:index')
const { start, html } = require('inu')
const { App, Domain, Action, run } = require('inux')
const log = require('inu-log')
const extend = require('xtend')
const pull = require('pull-stream')
const drain = require('pull-stream/sinks/drain')
const map = require('pull-stream/throughs/map')

// const { SET } = require('./actions')
// apps
const form = require('./apps/form')
const compare = require('./apps/compare')
// const dashboard = require('./apps/dashboard')
const landing = require('./landing/app')



const app = App([
  compare,
  form,
  landing
])

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  const { views } = start(app)

  pull(
    views(),
    map(v => {
     return v
    }),
    drain(function (view) {
     debug('v', view) 
      html.update(main, view)
    })
  )
})

