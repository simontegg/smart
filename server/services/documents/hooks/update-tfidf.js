
const debug = require('debug')('hooks:update-tfidf')

// pull-streams
const pull = require('pull-stream')
const once = require('pull-stream/sources/once')
const values = require('pull-stream/sources/values')
const split = require('pull-split')
const asyncMap = require('pull-stream/throughs/async-map')
const map = require('pull-stream/throughs/map')
const drain = require('pull-stream/sinks/drain')

// modules
const gramophone = require('gramophone')
const stopword = require('stopword')
const natural = require('natural')

// constants
const defaults = {}

module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function (hook, next) {
    hook.updateTfidf = true
    const tfidfService = hook.app.service('/tfidfs')
    const userId = hook.data.userId || 'default-user'
    let documentIndex
    // debug(hook.data)

    pull(
      once(userId),
      asyncMap(queryByUserId),
      map((result) => result.data[0]),
      map(getTfidf),
      asyncMap((tfidf, cb) => {
        documentIndex = tfidf.documents.length
        tfidf.addDocument(hook.data.text)
        const terms = tfidf.listTerms(documentIndex)
        debug(terms)
        const string = JSON.stringify(tfidf)
        if (documentIndex === 0) {
          tfidfService.create({ userId, string }, {}, cb)
        } else {
          tfidfService.update(userId, { userId, string }, {}, cb)
        }
      }),
      drain(
        (res) => {
          hook.data.tfidfId = userId
          hook.data.documentIndex = documentIndex
        },
        () => {
          next(null, hook)
        }
      )
    )

    function queryByUserId (userId, cb) {
      tfidfService.find({ query: { userId } }, cb)
    }
  }
}

function getTfidf (tfidf) {
  if (tfidf) {
    return new natural.TfIdf(JSON.parse(tfidf.string))
  } else {
    return new natural.TfIdf()
  }
}

//function tokenise (text) {
//  pull( 
//    once(text),
//    split(' '),
//    map((word)
//    filter
//
//  )
//}

