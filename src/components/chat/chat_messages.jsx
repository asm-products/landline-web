'use strict';

const ChatActions = require('../../actions/chat_actions');
const ChatInput = require('./chat_input.jsx');
const ChatMessage = require('./chat_message.jsx');
const ChatMessagesStore = require('../../stores/chat_messages_store');
const React = require('react/addons');

const ChatMessages = React.createClass({
  componentDidMount() {
    ChatMessagesStore.addChangeListener(this.updateMessages);
    // ChatActions.fetchRecentMessages();
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
        height: '100%',
        minHeight: 1,
        overflowY: 'scroll'
      }
    };

    return (
      <div className="flex flex-stretch flex-column" style={style.chatMessages}>
        <div className="flex-auto" style={style.chatMessages}>
          {this.renderMessages()}
        </div>

        <ChatInput />
      </div>
    );
  },

  renderMessages() {
    console.log(this.state.messages);
    return this.state.messages.map((message, i) => {
      return <ChatMessage message={message.toJS ? message.toJS() : message}
          key={`message-${i}`} />
    }).toJS();
  },

  updateMessages() {
    this.setState(this.getMessages());
  }
});

module.exports = ChatMessages;
