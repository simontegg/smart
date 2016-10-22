
const { Domain } = require('inux')
const { html } = require('inu')
const debug = require('debug')('apps:dashboard')

const form = require('../views/form')
const compare = require('../views/compare')
const { GET2 } = require('../effects')

const dashboard = Domain({
  routes: [
    [
      '/', 
      (params, model, dispatch) => {

        return html`
          <main>
            ${form(model, dispatch)}
            ${compare(model, dispatch)}
          </main>
        `
      }
    ]
  ]
})

module.exports = dashboard
