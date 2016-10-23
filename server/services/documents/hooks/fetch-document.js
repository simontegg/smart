const debug = require('debug')('hooks:fetch-documents')

// pull-streams
const pull = require('pull-stream')
const once = require('pull-stream/sources/once')
const asyncMap = require('pull-stream/throughs/async-map')
const map = require('pull-stream/throughs/map')
const filter = require('pull-stream/throughs/filter')
const drain = require('pull-stream/sinks/drain')
const collect = require('pull-stream/sinks/collect')

// modules
const isUrl = require('is-url')
const Url = require('url')
const merge = require('lodash.merge')
const extractor = require('unfluff')
const request = require('superagent')
const natural = require('natural')

// constants
const defaults = {}

module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function (hook) {
    debug('fetchDocument', hook.data)
    hook.fetchDocument = true
    const documents = hook.app.service('documents')
    const keywords = hook.app.service('keywords')

    const { url } = hook.data

    return new Promise(function (resolve, reject) {
      pull(
        once(url),
        asyncMap(queryByUrl),
        asyncMap((result, cb) => request.get(url, cb)),
        map(extract),
        drain(
          (document) => {
            if (document.keywords) {
              mapKeywordsToRows(document.keywords, url, keywords.create)
              delete document.keywords
            }
            hook.data = merge(
              hook.data, 
              document, 
              { domain: Url.parse(url).hostname }
            )
          },
          () => resolve(hook)
        )
      )
    })

    function queryByUrl (url, cb) {
      documents.get(url, {}, cb)
    }
  }
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

function mapKeywordsToRows (keywords, url, create) {
  pull(
    once(keywords),
    split(','),
    map(String.trim),
    map((keyword) => ({ term: keyword, document_url: url })),
    collect(create)
  )
}

