'use strict';

const $ = require('jquery');
const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');

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
      error() {}
    });
  };

  return func;
};

class ChatActions {
  destroy() {
    clearInterval(this.interval);
  }

  getChannels(url, token) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_CHANNELS_RECEIVED,
          channels: data.rooms
        });
      },
      error() {
        console.log(arguments);
      }
    });
  }

  getPixel(url, token) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      success(roomObj) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_PIXEL_RECEIVED,
          pixel: roomObj.pixel
        });
      },
      error() {
        console.log(arguments);
      }
    });
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
      error() {}
    });

    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
      message: message
    });
  }
};

module.exports = new ChatActions();
