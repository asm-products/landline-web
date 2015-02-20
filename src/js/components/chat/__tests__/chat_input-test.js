'use strict';

jest.dontMock('../chat_input.jsx');

const { Map } = require('immutable');
let React;
let TestUtils;

describe('ChatInput', () => {
  let ChatActions, ChatInput, chatInput;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;

    ChatActions = require('../../../actions/chat_actions');
    ChatInput = require('../chat_input.jsx');
    chatInput = TestUtils.renderIntoDocument(<ChatInput />);
  });

  describe('getInitialState()', () => {
    it('returns empty states for the state props', () => {
      let state = chatInput.getInitialState();

      expect(state.body).toEqual('');
      expect(state.tempUsername).toEqual('');
      expect(state.user.toJS()).toEqual({});
    });
  });
});
