'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { Map } = require('immutable');
const Store = require('./store');

let currentUser = Map();

class CurrentUserStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.USER_RECEIVE:
          currentUser = Map(action.user);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getUser() {
    return currentUser;
  }
}

module.exports = new CurrentUserStore();
