'use strict';

const assert = require('assert');
const fetchDocument = require('../../../../src/services/documents/hooks/fetch-document.js');

describe('documents fetchDocument hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    fetchDocument()(mockHook);

    assert.ok(mockHook.fetchDocument);
  });
});
