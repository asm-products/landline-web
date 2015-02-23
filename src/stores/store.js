'use strict';

const EventEmitter = require('events').EventEmitter
const CHANGE_EVENT = require('../constants').CHANGE_EVENT

class Store extends EventEmitter {
  constructor() {
    super()

    this.setMaxListeners(0)
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

module.exports = Store;
