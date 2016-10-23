const documents = require('./documents')
const authentication = require('./authentication')
const user = require('./user')
const tfidf = require('./tfidf')
const sample = require('./sample')
const similarity = require('./similarity')

module.exports = function () {
  const app = this

  app.configure(similarity)
  app.configure(authentication)
  app.configure(user)
  app.configure(documents)
  app.configure(tfidf)
  app.configure(sample)
}
