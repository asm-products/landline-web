'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ajax = require('../lib/ajax');
const Dispatcher = require('../dispatcher');

class TypeaheadActions {
  getUsersByPartialUsername(partialUsername, token) {
    ajax({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      url: `${__API_URL__}/users/search?u=${partialUsername}`,
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.TYPEAHEAD_USERS_RECEIVED,
          users: data.users
        });
      }
    });
  }

  selectUser(username) {
    Dispatcher.dispatch({
      actionType: ActionTypes.TYPEAHEAD_USERNAME_SELECTED,
      username: username
    });
  }
};

module.exports = new TypeaheadActions();
