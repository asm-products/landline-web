'use strict';

const ActionTypes = require('../constants').ActionTypes;
const ChatRoomMembershipsStore = require('./chat_room_memberships_store');
const Dispatcher = require('../dispatcher');
const { List } = require('immutable');
const Store = require('./store');
const UnreadChatRoomsStore = require('./unread_chat_rooms_store');

let rooms = List();

class ChatRoomsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_ROOMS_RECEIVED:
          Dispatcher.waitFor([
            ChatRoomMembershipsStore.dispatchToken,
            UnreadChatRoomsStore.dispatchToken
          ]);
          rooms = List(action.rooms);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getRooms() {
    return rooms;
  }

  getRoomBySlug(slug) {
    return rooms.find((room) => {
      return room.slug === slug;
    });
  }

  getSubscribedRooms() {
    let memberships = ChatRoomMembershipsStore.getMemberships();
    return rooms.filter((room) => {
      return memberships.has(room.id);
    });
  }
};

module.exports = new ChatRoomsStore();
