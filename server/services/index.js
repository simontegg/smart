const documents = require('./documents')
const authentication = require('./authentication')
const user = require('./user')
const tfidf = require('./tfidf')

module.exports = function() {
  const app = this


  app.configure(authentication)
  app.configure(user)
  app.configure(documents)
  app.configure(tfidf)
}
