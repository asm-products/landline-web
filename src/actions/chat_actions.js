'use strict';

const $ = require('jquery');
const ActionTypes = require('../constants').ActionTypes;
const SocketStore = require('../stores/socket_store');
const AppStore = require('../stores/app_store');
const CurrentUserStore = require('../stores/current_user_store');

const Dispatcher = require('../dispatcher');

const ONE_HOUR = 60 * 60 * 1000;


class ChatActions {
  init(){
    SocketStore.getSocket().on("message", this.onMessage)
  }
  onMessage(message, channel){
    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED,
      message: message,
      channel: channel
    });
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

  joinChannel(room) {
    SocketStore.getSocket().emit("join", room, (response) => {
      if(response.Success){
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_RECEIVED,
          membership: response.Result.room_id
        });
      }else{
        console.log(response);
      }
    })
  }

  leaveChannel(room) {
    SocketStore.getSocket().emit("leave", room, (response) => {
      if(response.Success){
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_DESTROYED,
          membership: response.Result
        });
      }else{
        console.log(response);
      }
    })
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

  getMessages(channel){
    const url = `${__API_URL__}/rooms/${channel}/messages`;
    $.ajax({
      url: url,
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${CurrentUserStore.getToken()}`
      },
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_MESSAGES_RECEIVED,
          messages: data.messages,
          channel: channel
        });
      },
      error() {}
    });
  }
};

module.exports = new ChatActions();
