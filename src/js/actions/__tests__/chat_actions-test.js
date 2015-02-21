'use strict';

jest.dontMock('../chat_actions');
jest.dontMock('react/lib/keyMirror');

describe('ChatActions', () => {
  describe('submitMessage()', () => {
    let ActionTypes, ChatActions, Dispatcher, Map;

    beforeEach(() => {
      ActionTypes = require('../../constants').ActionTypes;
      ChatActions = require('../chat_actions');
      Dispatcher = require('../../dispatcher');
      Map = require('immutable').Map;
    });

    it('dispatches the message', () => {
      let message = Map({
        user: { username: 'Bob' },
        body: 'Yo!'
      });

      ChatActions.submitMessage(message);

      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
        message: message
      });
    });
  });
});
