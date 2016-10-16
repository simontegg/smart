
const debug = require('debug')('hooks:update-tfidf')

// pull-streams
const pull = require('pull-stream')
const once = require('pull-stream/sources/once')
const asyncMap = require('pull-stream/throughs/async-map')
const map = require('pull-stream/throughs/map')
const drain = require('pull-stream/sinks/drain')

// modules
const natural = require('natural')

// constants
const defaults = {}

module.exports = function(options) {
  options = Object.assign({}, defaults, options)

  return function(hook, next) {
    hook.updateTfidf = true
    const tfidfService = hook.app.service('/tfidfs')
    const userId = hook.data.userId || 'default-user'
    //debug(hook.data)

    pull(
      once(userId),
      asyncMap(queryByUserId),
      map(getTfidf),
      asyncMap((tfidf, cb) => {
        const originalLength = tfidf.documents.length
        tfidf.addDocument(hook.data.text)
        const string = JSON.stringify(tfidf) 
        if (originalLength === 0) {
          tfidfService.create({ userId, string }, {}, cb)
        } else {
          tfidfService.update(userId, { userId, string }, {}, cb)
        }
      }),
      map(res => {
        debug('log', res)
        return res
      }),
      drain(
        () => {
          hook.data.tfidfId = userId
        }, 
        () => {
          debug('done', hook.data)
          next(null, hook)
        }
      )
    )

    function getTfidf (result) {
      let tfidf = result.data[0]
      if (tfidf) {
        tfidf = new natural.TfIdf(JSON.parse(tfidf.string))
      } else {
        tfidf = new natural.TfIdf()
      }
      debug(tfidf)
      return tfidf
    }

    function queryByUserId (userId, cb) {
      tfidfService.find({ query: { userId } }, cb)
    }
  }

}

