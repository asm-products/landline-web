'use strict';

const $ = require('jquery');
const ActionTypes = require('../constants').ActionTypes;
const SocketStore = require('../stores/socket_store');
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
          channels: data.rooms,
          memberships: data.memberships
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

  joinChannel(url, token) {
    $.ajax({
      url: url,
      method: 'PUT',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      success(membershipObj) {
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_RECEIVED,
          membership: membershipObj.membership.room_id
        });
      },
      error() {
        console.log(arguments);
      }
    });
  }

  leaveChannel(url, token) {
    $.ajax({
      url: url,
      method: 'DELETE',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      success(membershipObj) {
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_DESTROYED,
          membership: membershipObj.deleted
        });
      },
      error() {
        console.log(arguments);
      }
    });
  }

  submitMessage(room, body) {
    SocketStore.getSocket().emit("message", {Room: room, Body:body}, function(response){
        if(response.Success){
            Dispatcher.dispatch({
                actionType: ActionTypes.CHAT_MESSAGE_RECEIVED
            });
        }
    });
    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
      message: body
    });
  }
};

module.exports = new ChatActions();
