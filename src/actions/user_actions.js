'use strict';

const $ = require('jquery');
const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');

const ONE_HOUR = 60 * 60 * 1000;

let getUsers = (url, token) => {
  let func = () => {
    $.ajax({
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.USERS_RECEIVED,
          users: data.users
        });
      },
      error() {}
    });
  };

  return func;
};

class UserActions {
  destroy() {
    clearInterval(this.interval);
  }

  init(url, token) {
    getUsers(url, token)();
    this.interval = setInterval(getUsers(url, token), 60 * 1000);
  }

  logIn(user, token) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CURRENT_USER_RECEIVED,
      user: user,
      token: token
    });
  }
};

module.exports = new UserActions();
