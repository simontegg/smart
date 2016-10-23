const debug = require('debug')('hooks:respond-with-existing')

module.exports = function (options) {
  return function (hook) {
    debug('iii')
    hook.respondWithExisting = true
    const documents = hook.app.service('documents')
    return documents
      .get(hook.params.query.url)
      .then((result) => {
        hook.result = result
        return hook
      })
  }
}

