const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')
const debug = require('debug')('client:views:form')
const { post } = require('../effects')
// const { set } = require('../actions')

module.exports = function (model, dispatch) {
  function handleKeyDown (e) {
    debug(e.keyCode)
    if (e.target.keyCode === 13) {
      dispatch(run(post(getFormData(e.target))))
    }
  }

  function handlesumbit (e) {
    e.preventDefault()
    dispatch(run(post(getFormData(e.target))))
  }

  return html`
    <main>
      <form id='test' onsubmit=${handlesumbit} >
        <fieldset>
          <label for="url-input">url</label>
          <input 
            id="url-input"
            name="url" 
            value=""
            type="text" 
            onkeydown=${handleKeyDown} 
          />
        </fieldset>
        <div>${model}</div>
      </form>
    </main>
  `
}
