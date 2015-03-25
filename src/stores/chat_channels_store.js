'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ChatChannelMembershipsStore = require('./chat_channel_memberships_store');
const Dispatcher = require('../dispatcher');
const { List } = require('immutable');
const Store = require('./store');

let rooms = List();

class ChatChannelsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_CHANNELS_RECEIVED:
          Dispatcher.waitFor([ChatChannelMembershipsStore.dispatchToken]);
          rooms = List(action.rooms);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getChannels() {
    return rooms;
  }

  getSubscribedChannels() {
    let memberships = ChatChannelMembershipsStore.getMemberships();
    return rooms.filter((room) => {
      return memberships.has(room.id);
    });
  }
};

module.exports = new ChatChannelsStore();
