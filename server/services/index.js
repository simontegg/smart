const documents = require('./documents')
const authentication = require('./authentication')
const user = require('./user')
const tfidf = require('./tfidf')
const sample = require('./sample')
const similarity = require('./similarity')
const keywords = require('./keywords')

module.exports = function () {
  const app = this

  app.configure(similarity)
  app.configure(tfidf)
  app.configure(keywords)
  app.configure(authentication)
  app.configure(user)
  app.configure(documents)
  app.configure(sample)
}
