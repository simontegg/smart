const { html } = require('inu')
const { navigate } = require('inux')

const Link = require('../link/view')

module.exports = viewLanding

function viewLanding (model, dispatch) {
  const compare = { href: '/compare', text: 'compare' }
  const submit = { href: '/form', text: 'submit' }
  return html`
    <div>
      <div class='toolbar'>
        ${Link(compare, dispatch)}
        ${Link(submit, dispatch)}
      </div>
      <div class='center'>
        <header>
        </header>
      </div>
    </div>
  `
}
