const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')
const debug = require('debug')('client:similarity:view')
const { postSimilarity } = require('./effects')
// const { set } = require('../actions')

module.exports = function (model, dispatch) {
  function handleKeyDown (e) {
    debug(e.keyCode, getFormData(document.querySelector('#similarity')))
    if (e.keyCode === 13) {
      debug('dispatch', dispatch)
      dispatch(
        run(
          postSimilarity(
            getFormData(document.querySelector('#similarity'))
          )
        )
      )
    }
  }

  function handlesumbit (e) {
    e.preventDefault()
    dispatch(run(postSimilarity(getFormData(e.target))))
  }

  return html`
    <main>
      <form id='similarity' onsubmit=${handlesumbit} >
        <fieldset>
          <label for="url-input">url</label>
          <input 
            id="url-input-a"
            name="urlA" 
            value=""
            type="text" 
            onkeydown=${handleKeyDown} 
          />
        </fieldset>
        <fieldset>
          <label for="url-input">url</label>
          <input 
            id="url-input-b"
            name="urlB" 
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
