'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Store = require('./store');

let teamName = 'Landline';

class AppStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.APP_INITIALIZED:
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getTeamName() {
    return teamName;
  }
};

module.exports = new AppStore();
