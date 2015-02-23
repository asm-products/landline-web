'use strict';

jest.dontMock('../chat_message.jsx');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('ChatMessage', () => {
  let ChatMessage, chatMessage, message;

  beforeEach(() => {
    message = {
      body: 'landline',
      user: {
        username: 'Hemingway'
      }
    };
    ChatMessage = require('../chat_message.jsx');
    chatMessage= TestUtils.renderIntoDocument(
      <ChatMessage message={message} />
    );
  });

  it('renders with the appropriate props', () => {
    expect(TestUtils.isCompositeComponent(chatMessage)).toBe(true);
  });
});
