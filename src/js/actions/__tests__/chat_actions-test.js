'use strict';

jest.dontMock('../chat_actions');
jest.dontMock('react/lib/keyMirror');

describe('ChatActions', () => {
  describe('submitMessage()', () => {
    let ActionTypes, ChatActions, Dispatcher;

    beforeEach(() => {
      ActionTypes = require('../../constants').ActionTypes;
      ChatActions = require('../chat_actions');
      Dispatcher = require('../../dispatcher');
    });

    it('dispatches the message', () => {
      let message = {
        user: { username: 'Bob' },
        body: 'Yo!'
      };

      ChatActions.submitMessage(message);

      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
        message: message
      });
    });
  });
});
