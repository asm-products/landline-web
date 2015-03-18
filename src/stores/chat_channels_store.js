'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ChatChannelMembershipsStore = require('./chat_channel_memberships_store');
const Dispatcher = require('../dispatcher');
const { List } = require('immutable');
const Store = require('./store');

let channels = List();

class ChatChannelsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_CHANNELS_RECEIVED:
          Dispatcher.waitFor([ChatChannelMembershipsStore.dispatchToken]);
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

  getSubscribedChannels() {
    let memberships = ChatChannelMembershipsStore.getMemberships();
    return channels.filter((channel) => {
      return memberships.has(channel.id);
    });
  }
};

module.exports = new ChatChannelsStore();
