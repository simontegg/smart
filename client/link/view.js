const { html } = require('inu')
const { navigate } = require('inux')
const debug = require('debug')('link:view')

module.exports = Link

function Link ({ href, text }, dispatch) {
  debug(href, text)
  return html`
    <a href=${href} onclick=${handleClick}>${text}</a> 
  `

  function handleClick (ev) {
    ev.preventDefault()
    dispatch(navigate(href))
  }
}
