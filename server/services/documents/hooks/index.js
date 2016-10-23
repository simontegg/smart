// main
const debug = require('debug')('hooks:documents')
const NeDB = require('nedb')
const path = require('path')
const globalHooks = require('../../../hooks')
const hooks = require('feathers-hooks')
const { iff } = require('feathers-hooks-common')

// document hooks
const fetchDocument = require('./fetch-document')
const updateTfidf = require('./update-tfidf')
const respondWithExisting = require('./respond-with-existing')

exports.before = {
  all: [],
  find: [
//    iff(notcondition(), createOnFind())
  ],
  get: [],
  create: [
    iff(condition(notNew), respondWithExisting()),
    iff(condition(textNotExist), fetchDocument()), 
//    iff(condition(newDoc), updateTfidf())
  ],
  update: [],
  patch: [],
  remove: []
}

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

function condition (test) { 
  debug(';;;;')
  return hook => {
    debug('condition')
    const docService = hook.app.service('documents')
    return docService.find({ query: { url: hook.data.url } })
      .then(result => {
        debug(test, test(result))
        return test(result)
      })
      .catch(debug)
  }
}

function textNotExist (result) {
  debug(result)
  return result.total === 0 || !result.data[0].text
}

function newDoc (result) {
  return result.total === 0
}

function notNew (result) {
  return result.total > 0 && result.data[0].text
}
