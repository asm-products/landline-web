'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ajax = require('../lib/ajax');
const SocketStore = require('../stores/socket_store');
const AppStore = require('../stores/app_store');
const CurrentUserStore = require('../stores/current_user_store');
const Dispatcher = require('../dispatcher');

const ONE_HOUR = 60 * 60 * 1000;

class ChatActions {
  init() {
    SocketStore.getSocket().on('message', this.onMessage)
  }

  getRooms(url, token) {
    ajax({
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_ROOMS_RECEIVED,
          rooms: data.rooms,
          memberships: data.memberships,
          unreadRooms: data.unread_rooms
        });
      },
      error() {
        console.log(arguments);
      }
    });
  }

  fetchMessagesBeforeTimestamp(room, timestamp) {
    let url = `${__API_URL__}/rooms/${room}/messages?t=${timestamp}`;
    ajax({
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CurrentUserStore.getToken()}`
      },
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_MESSAGES_RECEIVED,
          messages: data.messages,
          room: room
        });
      },
      error() {}
    });
  }

  getMessages(room) {
    let url = `${__API_URL__}/rooms/${room}/messages`;
    ajax({
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CurrentUserStore.getToken()}`
      },
      success(data) {
        Dispatcher.dispatch({
          actionType: ActionTypes.CHAT_MESSAGES_RECEIVED,
          messages: data.messages,
          room: room
        });
      },
      error() {}
    });
  }

  getPixel(url, token) {
    ajax({
      url: url,
      method: 'GET',
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

  handleFailure(response) {
    console.log(response);
  }

  joinRoom(room) {
    SocketStore.getSocket().emit('join', room, (response) => {
      if (response.Success) {
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_RECEIVED,
          membership: response.Result.room_id
        });
      } else {
        this.handleFailure(response);
      }
    });
  }

  leaveRoom(room) {
    SocketStore.getSocket().emit('leave', room, (response) => {
      if (response.Success) {
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_DESTROYED,
          membership: response.Result
        });
      } else {
        this.handleFailure(response);
      }
    });
  }

  markRoomAsRead(roomSlug) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_ROOM_READ,
      room: roomSlug
    });
  }

  onMessage(message, room) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED,
      message: message,
      room: room
    });
  }

  submitMessage(room, body) {
    let message = {
      room: room,
      body: body
    };

    SocketStore.getSocket().emit("message", message, (response) => {
      if (response.Success) {
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
