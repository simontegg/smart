const { html } = require('inu')
const { run } = require('inux')
const debug = require('debug')('client:views:select')
const { select } = require('../effects')
// const { set } = require('../actions')

module.exports = function (model, dispatch) {

  function handleSelect (e) {
  }

  return html`
    <div>
      <div id="compare">${model}</div>
    </div>
  `
}
