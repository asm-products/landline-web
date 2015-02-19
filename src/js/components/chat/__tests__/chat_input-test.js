'use strict';

jest.dontMock('../chat_input.jsx');

const { Map } = require('immutable');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('ChatInput', () => {
  let ChatActions, ChatInput, chatInput;

  beforeEach(() => {
    ChatActions = require('../../../actions/chat_actions');
    ChatInput = require('../chat_input.jsx');
    chatInput = TestUtils.renderIntoDocument(<ChatInput foo="bar" />);
  });

  describe('getInitialState()', () => {
    // TestUtils doesn't want to render an <input />
    // because React.DOM.input is a composite component
    // under the hood but this component has no children
    xit('returns empty states for the state props', () => {
      let state = chatInput.getInitialState();

      expect(state.body).toEqual('');
      expect(state.tempUsername).toEqual('');
      expect(state.user.toJS()).toEqual({});
    });
  });
});
