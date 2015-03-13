'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { Map } = require('immutable');
const Store = require('./store');

var socket = null;
var connected = false;
var authenticated = false;

class SocketStore extends Store {
  constructor() {
    super();
    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.SOCKET_INITIALIZED:
          socket = action.socket;
          break;
        case ActionTypes.SOCKET_CONNECTED:
          connected = true;
          break;
        case ActionTypes.SOCKET_DISCONNECTED:
          connected = false;
          authenticated = false;
          break;
        case ActionTypes.SOCKET_AUTHENTICATED:
          authenticated = true;
          break;
        default:
          return
      }
      this.emitChange();
    });
  }

  getSocket(){
    return socket;
  }

  getConnected(){
    return connected;
  }

  getAuthenticated(){
    return authenticated;
  }
}

module.exports = new SocketStore();
