'use strict';

jest.dontMock('../chat_messages.jsx');

const { List, Map } = require('immutable');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('ChatMessages', () => {
  let ChatMessages,
    chatMessages,
    ChatMessagesStore,
    messages;

  beforeEach(() => {
    messages = List([
      Map(message = {
        body: 'landline',
        user: {
          username: 'Hemingway'
        }
      })
    ]);
    ChatMessagesStore = require('../../../stores/chat_messages_store');
    ChatMessagesStore.getMessages.mockReturnValue(messages);
    ChatMessages = require('../chat_messages.jsx');
    chatMessages = TestUtils.renderIntoDocument(<ChatMessages />);
  });

  // These tests are failing because of the issue with <input />
  // See chat_input-test.js
  describe('componentDidMount()', () => {
    xit('adds a change listener to ChatMessagesStore', () => {
      expect(ChatMessagesStore.addChangeListener).
        toBeCalledWith(chatMessages.updateMessages);
    });
  });

  describe('componentWillUnmount()', () => {
    xit('removes a change listener from ChatMessagesStore', () => {
      chatMessages.componentWillUnmount();

      expect(ChatMessagesStore.removeChangeListener).
        toBeCalledWith(chatMessages.updateMessages);
    });
  });
});
