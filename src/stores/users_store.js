'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ChatMessagesStore = require('./chat_messages_store');
const Dispatcher = require('../dispatcher');
const { fromJS, Set } = require('immutable');
const Store = require('./store');

const ONE_HOUR = 60 * 60 * 1000;

let users = Set();

class UsersStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.USER_RECEIVED:
          users = users.add(fromJS(action.user));
          break;
        case ActionTypes.USERS_RECEIVED:
          users = Set(fromJS(action.users));
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

  filterUsersByPartialUsername(partial) {
    return users.filter((user) => {
      return user.get('username').toLowerCase().indexOf((partial || '').toLowerCase()) > -1;
    }).slice(0, 10);
  }
}

module.exports = new UsersStore();
