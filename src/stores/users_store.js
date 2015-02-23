'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ChatMessagesStore = require('./chat_messages_store');
const Dispatcher = require('../dispatcher');
const { Map } = require('immutable');
const Store = require('./store');

const ONE_HOUR = 60 * 60 * 1000;

let users = Map();

class UsersStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.USERS_RECEIVED:
          users = Map(action.users);
          break;
        case ActionTypes.USER_RECEIVED:
          users = users.merge(action.user);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getUsers() {
    return users;
  }
}

module.exports = new UsersStore();
