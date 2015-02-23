'use strict';

jest.dontMock('../chat_channels_store');
jest.dontMock('immutable');
jest.dontMock('react/lib/keyMirror');

const { List } = require('immutable');

describe('ChatChannelsStore', () => {
  let ActionTypes, ChatChannelsStore, callback, Dispatcher;

  beforeEach(() => {
    ActionTypes = require('../../constants').ActionTypes;
    Dispatcher = require('../../dispatcher');
    ChatChannelsStore = require('../chat_channels_store');
    callback = Dispatcher.register.mock.calls[0][0];
  });

  describe('CHAT_CHANNELS_RECEIVED', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.CHAT_CHANNELS_RECEIVED,
        channels: [
          { url: '/test', label: 'test' }
        ]
      });
    });

    it('sets the channels as an immutable list', () => {
      let channels = ChatChannelsStore.getChannels();
      expect(List.isList(channels)).toBe(true);
      expect(channels.size).toEqual(1);
    });

    it('emits a change event', () => {
      expect(ChatChannelsStore.emitChange).toBeCalled();
    });
  });

  describe('anything else', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.FOO,
        channels: [
          { url: '/test', label: 'test' }
        ]
      });
    });

    it('does not emit a change event', () => {
      expect(ChatChannelsStore.emitChange).not.toBeCalled();
    });
  });
});
