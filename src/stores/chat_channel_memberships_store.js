'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ChatChannelsStore = require('./chat_channels_store');
const Dispatcher = require('../dispatcher');
const { List } = require('immutable');
const Store = require('./store');

let memberships = List();

class ChatChannelMembershipsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_CHANNELS_RECEIVED:
          Dispatcher.waitFor([ChatChannelsStore.dispatchToken]);
          memberships = List(action.memberships);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getChannelMemberships() {
    return memberships;
  }
};

module.exports = new ChatChannelMembershipsStore();
