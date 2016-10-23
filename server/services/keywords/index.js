const db = require('../../../data')
const service = require('feathers-knex')
//const hooks = require('./hooks')

module.exports = function () {
  const app = this

  let options = {
    Model: db,
    name: 'keywords',
    paginate: {
      default: 100,
      max: 100
    }
  }

  // Initialize our service with any options it requires
  app.use('/keywords', service(options))

  // Get our initialize service to that we can bind hooks
  const keywordsService = app.service('/keywords')

  // Set up our before hooks
//  keywordsService.before(hooks.before)

  // Set up our after hooks
 // keywordsService.after(hooks.after)
}
