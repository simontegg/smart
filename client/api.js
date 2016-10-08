const feathers = require('feathers-client')
//const config = require('../confi
const io = require('socket.io-client')
const socket = io('http://localhost:3030')


const api = feathers()
  .configure(feathers.hooks())
  .configure(feathers.socketio(socket))

module.exports = api
