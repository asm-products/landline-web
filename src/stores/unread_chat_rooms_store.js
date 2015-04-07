'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { Set } = require('immutable');
const Store = require('./store');

let unreadRooms = Set();

let roomMatches = (roomId) => {
  return (value) => {
    return value.key === roomId;
  };
};

class UnreadChatRoomsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_ROOMS_RECEIVED:
          unreadRooms = Set(action.unreadRooms);
          break;
        case ActionTypes.CHAT_ROOM_READ:
          unreadRooms = unreadRooms.filterNot(
            roomMatches(action.room)
          );
          break;
        case ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED:
          let room = action.room;
          room.key = room.id;
          unreadRooms = unreadRooms.add(room);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getUnreadRooms() {
    return unreadRooms;
  }
};

module.exports = new UnreadChatRoomsStore();
