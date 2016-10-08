const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')
const debug = require('debug')('client:views:form')
const { post } = require('../effects')
const { set } = require('../actions')

module.exports = function (model, dispatch) {
  function handleKeyDown (e) {
    debug(e.keyCode)
    if (e.target.keyCode === 13) {
      const formData = getFormData(e.target)
      dispatch(run(post(formData)))
    }
  }

  function handlesumbit (e) {
    e.preventDefault()
    const formData = getFormData(e.target)
    dispatch(run(post(formData)))
  }

  return html`
  <div>
    <form id='test' onsubmit=${handlesumbit} >
      <fieldset>
        <label>url</label>
        <input 
          name='url' 
          type='text' 
          value=${model.name} 
          onkeydown=${handleKeyDown} 
        />
      </fieldset>
    </form>
  </div>
  `
}
