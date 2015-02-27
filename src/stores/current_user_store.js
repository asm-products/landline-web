'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { Map } = require('immutable');
const Store = require('./store');

let token = null;
let currentUser = Map();

class CurrentUserStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CURRENT_USER_RECEIVED:
          currentUser = Map(action.user);
          token = action.token;
          break;
        case ActionTypes.TOKEN_RECEIVED:
          token = action.token;
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getToken() {
    return token;
  }

  getUser() {
    return currentUser;
  }

  isUserAuthenticated() {
    return !!token;
  }
}

module.exports = new CurrentUserStore();
