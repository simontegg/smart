'use strict'

const assert = require('assert')
const updateTfidf = require('../../../../src/services/documents/hooks/update-tfidf.js')

describe('documents updateTfidf hook', function () {
  it('hook can be used', function () {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    }

    updateTfidf()(mockHook)

    assert.ok(mockHook.updateTfidf)
  })
})
