'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const { Set } = require('immutable');
const Store = require('./store');

let memberships = Set();

class ChatRoomMembershipsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_ROOMS_RECEIVED:
          memberships = Set(action.memberships);
          break;
        case ActionTypes.MEMBERSHIP_RECEIVED:
          memberships = memberships.add(action.membership);
          break;
        case ActionTypes.MEMBERSHIP_DESTROYED:
          memberships = memberships.delete(action.membership);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getMemberships() {
    return memberships;
  }
};

module.exports = new ChatRoomMembershipsStore();
