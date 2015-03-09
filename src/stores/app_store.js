'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Store = require('./store');

let teamName = 'Landline';
let url = '';

class AppStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.APP_INITIALIZED:
          url = action.url;
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

  getUrl() {
    return url;
  }
};

module.exports = new AppStore();
