const path = require('path')
const NeDB = require('nedb')
const service = require('feathers-nedb')
const hooks = require('./hooks')

module.exports = function () {
  const app = this

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'tfidfs.db'),
    autoload: true
  })

  let options = {
    id: 'userId',
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
