'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { List } = require('immutable');
const Store = require('./store');

let channels = List();
let currentChannel = 'general';

class ChatChannelsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_CHANNELS_RECEIVED:
          channels = List(action.channels);
          break;
        case ActionTypes.CHAT_CHANNEL_RECEIVED:
          currentChannel = action.channel;
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getCurrentChannel() {
    return currentChannel;
  }

  getChannels() {
    return channels;
  }
};

module.exports = new ChatChannelsStore();
