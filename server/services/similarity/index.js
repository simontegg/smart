const hooks = require('./hooks')
const debug = require('debug')('similarity')


// post document urls 
// if no exist -> create
//  -> fetchDocuments
//  -> updata
const Service = {
  setup(app) {
    this.app = app
  },

  find(params, cb) {
    const { userId, urlA, urlB } = params.query
    console.log(params.query)
    const docService = this.app.service('documents')
    
    docService.create({ url: urlA }, (err, result) => {
      cb(null, result)
    })

  }

}

module.exports = function(){
  const app = this

  // Initialize our service with any options it requires
  app.use('/similarities', Service)

  // Get our initialize service to that we can bind hooks
  const similarityService = app.service('/similarities')

  // Set up our before hooks
  similarityService.before(hooks.before)

  // Set up our after hooks
  similarityService.after(hooks.after)
}

module.exports.Service = Service
