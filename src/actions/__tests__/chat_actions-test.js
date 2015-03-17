'use strict';

jest.dontMock('../chat_actions');
jest.dontMock('react/lib/keyMirror');

const mockSocket = {
  emit: jest.genMockFn(),
  on: jest.genMockFn()
};

describe('ChatActions', () => {
  describe('submitMessage()', () => {
    let ActionTypes, ChatActions, Dispatcher, Map;

    beforeEach(() => {
      SocketStore = require('../../stores/socket_store')
      SocketStore.getSocket.mockReturnValue(mockSocket);

      ActionTypes = require('../../constants').ActionTypes;
      ChatActions = require('../chat_actions');
      Dispatcher = require('../../dispatcher');
      Map = require('immutable').Map;
    });

    it('dispatches the message', () => {

      ChatActions.submitMessage("foo", "OMGWTFBBQ!");

      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
        message: "OMGWTFBBQ!"
      });
    });
  });
});
