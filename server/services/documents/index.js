const db = require('../../../data')
const path = require('path')
const NeDB = require('nedb')
const service = require('feathers-knex')
const hooks = require('./hooks')

module.exports = function () {
  const app = this

  let options = {
    Model: db,
    name: 'documents',
    id: 'url',
    paginate: {
      default: 100,
      max: 100
    }
  }

  // Initialize our service with any options it requires
  app.use('/documents', service(options))

  // Get our initialize service to that we can bind hooks
  const documentsService = app.service('/documents')

  // Set up our before hooks
  documentsService.before(hooks.before)

  // Set up our after hooks
  documentsService.after(hooks.after)
}
