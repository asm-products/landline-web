'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { Set } = require('immutable');
const Store = require('./store');

let potentialUsers = Set();

class TypeaheadUsersStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.TYPEAHEAD_USERS_RECEIVED:
          potentialUsers = Set(action.users);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getPotentialUsers() {
    return potentialUsers;
  }
}

module.exports = new TypeaheadUsersStore();
