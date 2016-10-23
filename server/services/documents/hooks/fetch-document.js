const debug = require('debug')('hooks:fetch-documents')

// pull-streams
const pull = require('pull-stream')
const once = require('pull-stream/sources/once')
const asyncMap = require('pull-stream/throughs/async-map')
const map = require('pull-stream/throughs/map')
const filter = require('pull-stream/throughs/filter')
const drain = require('pull-stream/sinks/drain')
const collect = require('pull-stream/sinks/collect')
const split = require('pull-split')

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
    hook.fetchDocument = true
    const documents = hook.app.service('documents')
    const keywordService = hook.app.service('keywords')

    const { url } = hook.data
    debug(url)

    return new Promise((resolve, reject) => {
      debug('promise')
      pull(
        once(url),
        asyncMap((url, cb) => request.get(url, cb)),
        map(extract),
        drain(
          (document) => {
            debug(document)
            if (document.keywords) {
              mapKeywordsToRows(document.keywords, url)
              delete document.keywords
            }
            document.author = document.author[0]
            hook.data = merge(
              hook.data, 
              document, 
              { hostname: Url.parse(url).hostname }
            )
            debug('after merge',hook.data)
          },
          () => {
            resolve(hook)
          }
        )
      )
    })

    function queryByUrl (url, cb) {
      documents.get(url, {}, cb)
    }

    function mapKeywordsToRows (keywords, url) {
      pull(
        once(keywords),
        split(','),
        map(String.trim),
        map((keyword) => ({ term: keyword, document_url: url })),
        collect((err, ks) => keywordService.create(ks))
      )
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


