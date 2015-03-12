'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { List, Map } = require('immutable');
const Store = require('./store');

let unconfirmedMessages = List();
let messages = Map();

class ChatMessagesStore extends Store {
  constructor() {
    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED:
          messages = messages.set(action.channel, messages.get(action.channel, List()).push(action.message));
          break;
        case ActionTypes.CHAT_MESSAGE_SUBMITTED:
          unconfirmedMessages = unconfirmedMessages.push(action.message);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getMessages(channel) {
    return messages.get(channel) || List();
  }
};

module.exports = new ChatMessagesStore();
