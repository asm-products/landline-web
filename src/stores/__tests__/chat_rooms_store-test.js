'use strict';

jest.dontMock('../chat_rooms_store');
jest.dontMock('immutable');
jest.dontMock('react/lib/keyMirror');

const { List } = require('immutable');

describe('ChatRoomsStore', () => {
  let ActionTypes, ChatRoomsStore, callback, Dispatcher;

  beforeEach(() => {
    ActionTypes = require('../../constants').ActionTypes;
    Dispatcher = require('../../dispatcher');
    ChatRoomsStore = require('../chat_rooms_store');
    callback = Dispatcher.register.mock.calls[0][0];
  });

  describe('CHAT_ROOMS_RECEIVED', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.CHAT_ROOMS_RECEIVED,
        rooms: [
          { url: '/test', label: 'test' }
        ]
      });
    });

    it('sets the channels as an immutable list', () => {
      let channels = ChatRoomsStore.getRooms();
      expect(List.isList(channels)).toBe(true);
      expect(channels.size).toEqual(1);
    });

    it('emits a change event', () => {
      expect(ChatRoomsStore.emitChange).toBeCalled();
    });
  });

  describe('anything else', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.FOO,
        rooms: [
          { url: '/test', label: 'test' }
        ]
      });
    });

    it('does not emit a change event', () => {
      expect(ChatRoomsStore.emitChange).not.toBeCalled();
    });
  });
});
