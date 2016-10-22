const { html } = require('inu')
const formView = require('./form')

module.exports = function (model, dispatch) {
  return html`
    <div>
      ${formView(model, dispatch)}
    </div>
  `
}
