'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { List, Map } = require('immutable');
const Store = require('./store');
const moment = require('moment')

let unconfirmedMessages = List();
let messages = Map();

// transform a message before saving it.
let transformMessage = (msg) => {
  msg.created_at = moment(msg.created_at);
  msg.last_online_at = moment(msg.last_online_at);
  return msg
};

class ChatMessagesStore extends Store {
  constructor() {
    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_MESSAGES_RECEIVED:
          messages = messages.set(
            action.room,
            messages.get(
              action.room,
              List()
            ).concat(List(action.messages).map(transformMessage))
          );
          break;
        case ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED:
          messages = messages.set(
            action.room,
            messages.get(
              action.room,
              List()
            ).unshift(transformMessage(action.message))
          );
          break;
        case ActionTypes.CHAT_MESSAGE_SUBMITTED:
          unconfirmedMessages = unconfirmedMessages.unshift(action.message);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getMessages(room) {
    return messages.get(room) || List();
  }
};

module.exports = new ChatMessagesStore();
