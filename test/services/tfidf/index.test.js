'use strict'

const assert = require('assert')
const app = require('../../../src/app')

describe('tfidf service', function () {
  it('registered the tfidfs service', () => {
    assert.ok(app.service('tfidfs'))
  })
})
