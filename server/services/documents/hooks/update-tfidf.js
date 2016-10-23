const debug = require('debug')('hooks:update-tfidf')

// pull-streams
const pull = require('pull-stream')
const once = require('pull-stream/sources/once')
const values = require('pull-stream/sources/values')
const split = require('pull-split')
const asyncMap = require('pull-stream/throughs/async-map')
const map = require('pull-stream/throughs/map')
const drain = require('pull-stream/sinks/drain')
const onEnd = require('pull-stream/sinks/on-end')

// modules
const gramophone = require('gramophone')
const stopword = require('stopword')
const natural = require('natural')

// constants
const defaults = {}

module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function (hook) {
    debug('updateTfidf', hook.data)
    hook.updateTfidf = true
    const tfidfService = hook.app.service('/tfidfs')
    const userId = hook.data.userId || 'default-user'
    let documentIndex
   
    return new Promise((resolve, reject) => {
      pull(
        once(userId),
        asyncMap(queryByUserId),
        map(t => {
          debug('test', t)
          return t
        }),
        map(getTfidf),
        asyncMap((tfidf, cb) => {
          documentIndex = tfidf.documents.length
          tfidf.addDocument(hook.data.text)
          const serialised = JSON.stringify(tfidf)

          if (documentIndex === 0) {
            tfidfService.create(
              { user_id: userId, serialised }, 
              {}, 
              (err, res) => {
                debug(err, res)
                cb(err, res)
              }
            )
          } else {
            tfidfService.update(
              userId, 
              { serialised }, 
              {}, 
              (err, res) => {
                debug(err, res)
                cb(err, res)
              }
            )
          }
        }),
        drain(
          () => {
            debug('drain', hook.data)
          },
          () => {
            debug('drain', hook.data)
            resolve(hook)
          }
        
        )
      )
    })

    function queryByUserId (userId, cb) {
      debug('userId', userId)
      tfidfService.get(userId, {}, (err, tfidf) => {
        debug(err, tfidf)
        if (err.code === 404) cb(null, undefined)
        cb(err, tfidf)
      })
    }
  }
}

function getTfidf (tfidf) {
  debug('getTfidf', tfidf)
  if (tfidf) {
    return new natural.TfIdf(JSON.parse(tfidf.string))
  } else {
    return new natural.TfIdf()
  }
}

