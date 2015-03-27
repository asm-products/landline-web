'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { List } = require('immutable');
const Store = require('./store');

let unreadRooms = List();

let filterPredicate = (roomId) => {
  return (value) => {
    return value === roomId;
  };
};

class UnreadChatRoomsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_ROOMS_RECEIVED:
          unreadRooms = List(action.unreadRooms);
          break;
        case ActionTypes.CHAT_ROOM_READ:
          unreadRooms = unreadRooms.filterNot(
            filterPredicate(action.room)
          );
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
