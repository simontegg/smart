const NeDB = require('nedb')
const hooks = require('./hooks')
const path = require('path')
const debug = require('debug')('services:sample')
const extend = require('xtend')

const query = { tfidfId: 'default-user' }

const sample = {
  setup(app) {
    this.app = app
    this.db = new NeDB({
      filename: __dirname + '/../../data/documents.db',
      autoload: true
    })
  },

  find(params, callback) {
    const documents = []
    const docService = this.app.service('documents')
    debug(123)

    docService.find({ query: query }, (err, docs) => {
      debug('hittting')
      const total = docs.total
      const firstIndex = random(total)
      const params = { 
        query: extend(query, { $skip: firstIndex, $limit: 1 })
      }

      docService.find(params, (err, docs) => {
        documents.push(docs.data[0])
        const params = { 
          query: extend(
            query, 
            { $skip: random(total, firstIndex), $limit: 1 }
          )
        }

        docService.find(params, (err, docs) => {
          documents.push(docs.data[0])
          callback(null, documents)
        })

      })

    })

  }

}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/sample', sample);

  // Get our initialize service to that we can bind hooks
  const sampleService = app.service('/sample');

  // Set up our before hooks
  sampleService.before(hooks.before);

  // Set up our after hooks
  sampleService.after(hooks.after)
}

module.exports.Service = sample;


function random (max, not) {
  const num = Math.floor(Math.random() * max)
  if (max !== 0 && num === not) return random(max, not)
  return num
}
