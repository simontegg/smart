const db = require('../../../data')
const path = require('path')
const NeDB = require('nedb')
const service = require('feathers-knex')
const hooks = require('./hooks')

module.exports = function () {
  const app = this

  let options = {
    id: 'user_id',
    name: 'tfidfs',
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  }

  // Initialize our service with any options it requires
  app.use('/tfidfs', service(options))

  // Get our initialize service to that we can bind hooks
  const tfidfService = app.service('/tfidfs')

  // Set up our before hooks
  tfidfService.before(hooks.before)

  // Set up our after hooks
  tfidfService.after(hooks.after)
}
