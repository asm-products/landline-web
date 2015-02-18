const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Store = require('./store');

let component = {};
let context = {};

class AppStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.ROUTE_CHANGED:
          component = action.component;
          context = action.context;
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getComponent() {
    return component;
  }

  getContext() {
    return context;
  }
};

module.exports = new AppStore();
