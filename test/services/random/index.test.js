'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('random service', function() {
  it('registered the randoms service', () => {
    assert.ok(app.service('randoms'));
  });
});
