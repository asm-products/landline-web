'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Store = require('./store');

let pixel = '';

class ChatPixelStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      if (action.actionType === undefined) {
        debugger;
      }

      switch (action.actionType) {
        case ActionTypes.CHAT_PIXEL_RECEIVED:
          pixel = action.pixel;
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getPixelSrc() {
    return pixel;
  }
};

module.exports = new ChatPixelStore();
