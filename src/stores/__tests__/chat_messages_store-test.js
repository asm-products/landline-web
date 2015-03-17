'use strict';

jest.dontMock('../chat_messages_store');
jest.dontMock('immutable');
jest.dontMock('react/lib/keyMirror');

const { List } = require('immutable');

describe('ChatMessagesStore', () => {
  let ActionTypes, ChatMessagesStore, callback, Dispatcher;

  beforeEach(() => {
    ActionTypes = require('../../constants').ActionTypes;
    Dispatcher = require('../../dispatcher');
    ChatMessagesStore = require('../chat_messages_store');
    callback = Dispatcher.register.mock.calls[0][0];
  });

  describe('CHAT_SERVER_MESSAGE_RECEIVED', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED,
        channel: "foo",
        message: {
          body: `Their very physical passing becomes rumor with a thousand faces
           before breath is out of them, lest paradoxical truth outrage itself.`,
          user: {
            username: 'Faulkner'
          }
        },
        key: 1111
      });
    });

    it('pushes a message into the list of the right channel', () => {
      expect(ChatMessagesStore.getMessages("foo").size).toEqual(1);

      callback({
        actionType: ActionTypes.CHAT_SERVER_MESSAGE_RECEIVED,
        channel: "foo",
        message: {
          body: `Nothing travels faster than the speed of light with the
            possible exception of bad news, which obeys its own special laws`,
          user: {
            username: 'Douglas Adams'
          }
        },
        key: 2222
      });

      expect(ChatMessagesStore.getMessages("foo").size).toEqual(2);
    });

    it('emits a change event', () => {
      expect(ChatMessagesStore.emitChange).toBeCalled();
    });
  });

  describe('anything else', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.FOO,
        message: {
          body: `Their very physical passing becomes rumor with a thousand faces
           before breath is out of them, lest paradoxical truth outrage itself.`,
          user: {
            username: 'Faulkner'
          }
        },
        key: 1111
      });
    });

    it('does not emit a change event', () => {
      expect(ChatMessagesStore.emitChange).not.toBeCalled();
    });
  });
});
