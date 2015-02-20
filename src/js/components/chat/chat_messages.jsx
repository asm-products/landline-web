'use strict';

const ChatInput = require('./chat_input.jsx');
const ChatMessage = require('./chat_message.jsx');
const ChatMessagesStore = require('../../stores/chat_messages_store');
const React = require('react/addons');

const ChatMessages = React.createClass({
  componentDidMount() {
    ChatMessagesStore.addChangeListener(this.updateMessages);
  },

  componentWillUnmount() {
    ChatMessagesStore.removeChangeListener(this.updateMessages);
  },

  getInitialState() {
    return this.getMessages();
  },

  getMessages() {
    return {
      messages: ChatMessagesStore.getMessages()
    };
  },

  render() {
    let style = {
      chatMessages: {
        height: '100%'
      }
    };

    return (
      <div className="flex flex-stretch flex-column" style={style.chatMessages}>
        <div className="flex-auto">
          {this.renderMessages()}
        </div>

        <ChatInput />
      </div>
    );
  },

  renderMessages() {
    return this.state.messages.map((message, i) => {
      return <ChatMessage message={message.toJS()} key={`message-${i}`} />
    }).toJS();
  },

  updateMessages() {
    this.setState(this.getMessages());
  }
});

module.exports = ChatMessages;
