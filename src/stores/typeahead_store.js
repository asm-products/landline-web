'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Store = require('./store');

let currentUsername = '';

class TypeaheadStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.TYPEAHEAD_USERNAME_SELECTED:
          currentUsername = action.username;
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getCurrentUsername() {
    let name = currentUsername;
    currentUsername = '';
    return name;
  }
}

module.exports = new TypeaheadStore();
