'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ajax = require('../lib/ajax');
const AppStore = require('../stores/app_store');
const ChatRoomsStore = require('../stores/chat_rooms_store');
const CurrentUserStore = require('../stores/current_user_store');
const Dispatcher = require('../dispatcher');
const SocketStore = require('../stores/socket_store');


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
      error(jqXhr, error) {
        console.error(error.message);
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
      if (response.success) {
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_RECEIVED,
          membership: response.result.room_id
        });
      } else {
        this.handleFailure(response);
      }
    });
  }

  leaveRoom(room) {
    SocketStore.getSocket().emit('leave', room, (response) => {
      if (response.success) {
        Dispatcher.dispatch({
          actionType: ActionTypes.MEMBERSHIP_DESTROYED,
          membership: response.result
        });
      } else {
        this.handleFailure(response);
      }
    });
  }

  markRoomAsRead(roomId) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_ROOM_READ,
      room: roomId
    });
  }

  onMessage(message, roomSlug) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED,
      message: message,
      room: ChatRoomsStore.getRoomBySlug(roomSlug)
    });
  }

  submitMessage(roomSlug, body) {
    let message = {
      room: roomSlug,
      body: body
    };

    SocketStore.getSocket().emit("message", message, (response) => {
      if (response.success) {
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
