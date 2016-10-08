'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const fetchDocument = require('./fetch-document')


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    fetchDocument()
  ],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};


