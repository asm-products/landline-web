'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { List, Map } = require('immutable');
const Store = require('./store');

let unconfirmedMessages = List();
let messages = List();

class ChatMessagesStore extends Store {
  constructor() {
    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_MESSAGES_RECEIVED:
          messages = List(action.messages);
          unconfirmedMessages = unconfirmedMessages.clear();
          break;
        case ActionTypes.CHAT_MESSAGE_RECEIVED:
          messages = messages.push(action.message);
          unconfirmedMessages = unconfirmedMessages.clear();
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

  getMessages() {
    return messages;
  }
};

module.exports = new ChatMessagesStore();
