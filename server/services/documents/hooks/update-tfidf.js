
const debug = require('debug')('hooks:fetch-documents')

// pull-streams
const pull = require('pull-stream')
const once = require('pull-stream/sources/once')
const asyncMap = require('pull-stream/throughs/async-map')
const map = require('pull-stream/throughs/map')
const filter = require('pull-stream/throughs/filter')
const drain = require('pull-stream/sinks/drain')

// modules
const isUrl = require('is-url')
const merge = require('lodash.merge')
const extractor = require('unfluff')
const request = require('superagent')
const natural = require('natural')

// constants
const defaults = {}

module.exports = function(options) {
  options = Object.assign({}, defaults, options)

  return function(hook, next) {
    hook.updateTfidf = true
    const { url, userId } = hook.data
    debug('url', hook.data)

    if (isUrl(url)) {
      const documents = hook.app.service('documents')
      
      pull(
        once(url),
        asyncMap(queryByUrl),
        filter(result => !result.data[0].text),
        asyncMap((documents, cb) => request.get(url, cb)),
        map(extract),
        drain(
          document => {
            hook.data = merge(hook.data, document)
          }, 
          () => {
            debug('done', hook.data)
            next(null, hook)
          }
        )
      )
    } else {
      next(null, hook)
    }

    function extract (res) {
      return { text, description, author } = extractor(res.text)
    }

    function queryByUrl (url, cb) {
      documents.find({ query: { url } }, cb)
    }
  }
}

