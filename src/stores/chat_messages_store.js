'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { List, Map } = require('immutable');
const Store = require('./store');

let unconfirmedMessages = List();
let messages = Map();

//transform a message before saving it.
let transformMessage = function(msg){
  msg.created_at = new Date(msg.created_at);
  msg.last_online_at = new Date(msg.last_online_at);
  return msg
}

class ChatMessagesStore extends Store {
  constructor() {
    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_MESSAGES_RECEIVED:
          messages = messages.set(action.channel, List(action.messages).map(transformMessage);
          break;
        case ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED:
          messages = messages.set(action.channel, messages.get(action.channel, List()).push(transformMessage(action.message)));
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
