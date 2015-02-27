'use strict';

const $ = require('jquery');
const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const PersistenceUtils = require('../utils/persistence_utils');

const ONE_HOUR = 60 * 60 * 1000;

let getMessages = (url, token) => {
  let func = () => {
    $.ajax({
      url: url,
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${token}`
      },
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_MESSAGES_RECEIVED,
          messages: data.messages
        });
      },
      err() {
        console.log(arguments);
      }
    });
  };

  return func;
};

class ChatActions {
  destroy() {
    clearInterval(this.interval);
  }

  init(url, token) {
    this.interval = setInterval(getMessages(url, token), 500);
  }

  submitMessage(url, token, message) {
    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        body: message.get('body')
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      success(messageObj) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_MESSAGE_RECEIVED,
          message: message
        });
      },
      error(jqXhr) {
        console.log(arguments);
      }
    });

    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
      message: message
    });
  }
};

module.exports = new ChatActions();
