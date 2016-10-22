'use strict'

const assert = require('assert')
const app = require('../../../src/app')

describe('documents service', function () {
  it('registered the documents service', () => {
    assert.ok(app.service('documents'))
  })
})
