'use strict';
const moment = require('moment')

jest.dontMock('../chat_message.jsx');

describe('ChatMessage', () => {
  let ChatMessage, chatMessage, message, React, TestUtils;

  beforeEach(() => {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    message = {
      body: 'landline',
      html_body: '<p>landline :smile:</p>',
      user: {
        username: 'Hemingway'
      },
      created_at: moment("2015-03-16T18:25:55.446622Z"),
      last_online_at: moment("2015-03-16T18:25:55.446622Z"),
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
