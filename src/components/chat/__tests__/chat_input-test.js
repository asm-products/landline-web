'use strict';

jest.dontMock('../chat_input.jsx');

const { Map } = require('immutable');
let React;
let TestUtils;

describe('ChatInput', () => {
  let ChatActions, ChatInput, chatInput, CurrentUserStore, currentUser;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;

    currentUser = Map({
      username: 'foo'
    });
    ChatActions = require('../../../actions/chat_actions');
    ChatInput = require('../chat_input.jsx');
    CurrentUserStore = require('../../../stores/current_user_store');
    CurrentUserStore.getUser.mockReturnValue(currentUser);
    chatInput = TestUtils.renderIntoDocument(<ChatInput />);
  });

  describe('getInitialState()', () => {
    it('returns empty states for the state props', () => {
      let state = chatInput.getInitialState();

      expect(state.user).toEqual(currentUser);
    });
  });
});
