'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('similarity service', function() {
  it('registered the similarities service', () => {
    assert.ok(app.service('similarities'));
  });
});
