const { html } = require('inu')
const { navigate } = require('inux')


module.exports = viewLanding

function viewLanding (model, dispatch) {
  return html`
    <div>
      <div class='toolbar'>
        <a href="/compare">compare</a>
        <a href="/form">submit</a>
      </div>
      <div class='center'>
        <header>
        </header>
      </div>
    </div>
  `
}
