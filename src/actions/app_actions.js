'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');

class AppActions {
  init(url) {
    Dispatcher.dispatch({
      actionType: ActionTypes.APP_INITIALIZED,
      url: url
    });
  }
};

module.exports = new AppActions();
