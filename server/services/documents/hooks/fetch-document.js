const debug = require('debug')('server:services:documents:hooks:fetch-documents')
const pull = require('pull-stream')
const defaults = {}

module.exports = function(options) {
  options = Object.assign({}, defaults, options)

  return function(hook) {
    hook.fetchDocument = true
    debug(hook)
    


  }
}
