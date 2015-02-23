'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { List } = require('immutable');
const Store = require('./store');

let channels = List([
  { url: '/foo', label: 'bar' },
  { url: '/fizz', label: 'bar' }
]);

class ChatChannelsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_CHANNELS_RECEIVED:
          channels = List(action.channels);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getChannels() {
    return channels;
  }
};

module.exports = new ChatChannelsStore();
