'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');

class TypeaheadActions {
  selectUser(user) {
    Dispatcher.dispatch({
      actionType: ActionTypes.TYPEAHEAD_USER_SELECTED,
      user: user
    });
  }
};

module.exports = new TypeaheadActions();
