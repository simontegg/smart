const { Domain, navigate } = require('inux')
const { html } = require('inu')
const debug = require('debug')('landing:app')
const landingView = require('./view')


const landing = Domain({
  init: () => ({ model: ''}),

  routes: [
    [
      '', 
      (params, model, dispatch) => {
        debug('landing')
       // process.nextTick(() => {
       //   dispatch(navigate('/form'))
       // })
        return html`
          <main>
            ${landingView(model, dispatch)}
          </main>
        `
      }
    ]
  ]
})

module.exports = landing
