'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');

class TypeaheadActions {
  selectUser(username) {
    Dispatcher.dispatch({
      actionType: ActionTypes.TYPEAHEAD_USERNAME_SELECTED,
      username: username
    });
  }
};

module.exports = new TypeaheadActions();
