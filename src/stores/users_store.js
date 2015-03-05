'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ChatMessagesStore = require('./chat_messages_store');
const Dispatcher = require('../dispatcher');
const { fromJS, List } = require('immutable');
const Store = require('./store');

const ONE_HOUR = 60 * 60 * 1000;

let users = List();

class UsersStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.USER_RECEIVED:
          users = users.push(action.user);
          break;
        case ActionTypes.USERS_RECEIVED:
          users = List(action.users);
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
      return user.username.toLowerCase().indexOf((partial || '').toLowerCase()) > -1;
    }).slice(0, 10);
  }
}

module.exports = new UsersStore();
