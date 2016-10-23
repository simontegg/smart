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

module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function (hook, next) {
    hook.fetchAndUpdate = true
    const documents = hook.app.service('documents')
    const { url, userId, text } = hook.data

    pull(
      once(url),
      asyncMap((url, cb) => request.get(url, cb)),
        map(extract),
      map(m => {
        debug(m)
        return m
      }),
      drain(
        document => {
          hook.data = merge(hook.data, document)
        },
        () => {
          next(null, hook)
        }
      )
    )
  } else {
    next(null, hook)
  }

  function extract (res) {
    const {
      text,
      title,
      description,
      author,
      keywords,
      publisher
    } = extractor(res.text)
    return { text, title, description, author, keywords, publisher }
  }

  function queryByUrl (url, cb) {
    documents.find({ query: { url } }, cb)
  }
}
}

