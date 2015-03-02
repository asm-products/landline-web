'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Store = require('./store');

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

  getUrl() {
    return url;
  }
};

module.exports = new AppStore();
