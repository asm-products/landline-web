'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const PersistenceUtils = require('../utils/persistence_utils');

const ONE_HOUR = 60 * 60 * 1000;

class UserActions {
  constructor() {
    this.persistence = new PersistenceUtils(
      'users',
      ActionTypes.USER_RECEIVED,
      'user'
    );
  }

  fetchRecentUsers() {
    this.persistence.query().orderByChild('lastOnline').startAt(+Date.now() - ONE_HOUR).
    once('value', (snapshot) => {
      let users = snapshot.val();

      Dispatcher.dispatch({
        actionType: ActionTypes.USERS_RECEIVED,
        users: users
      });
    });
  }

  logIn(username) {
    this.persistence.base.authAnonymously((err, data) => {
      if (err) {
        return Dispatcher.dispatch({
          actionType: ActionTypes.LOGIN_FAILED
        });
      }

      let token = data.token;

      delete data.token;

      data.username = username;

      Dispatcher.dispatch({
        actionType: ActionTypes.CURRENT_USER_RECEIVED,
        user: data,
        token: token
      });

      this.persistence.push({
        username: username,
        lastOnline: +Date.now()
      });
    });
  }
};

module.exports = new UserActions();
