'use strict';

const ChatActions = require('../../actions/chat_actions');
const ChatInput = require('./chat_input.jsx');
const ChatMessage = require('./chat_message.jsx');
const ChatMessagesStore = require('../../stores/chat_messages_store');
const React = require('react/addons');

const ChatMessages = React.createClass({
  componentDidMount() {
    ChatMessagesStore.addChangeListener(this.updateMessages);
    ChatActions.init();
    this.scrollToBottom();
  },

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  },

  componentWillUpdate() {
    let node = this.refs.messages.getDOMNode();
    // magic number :(
    // After scrolling, it seems like the scroll value is sometimes off by one;
    // the ||-check makes sure we catch that.
    this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight ||
      node.scrollHeight - node.scrollTop + node.offsetHeight === 1;
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
        overflowY: 'auto'
      }
    };

    return (
      <div className="flex flex-stretch flex-column" style={style.chatMessages}>
        <div className="flex-auto" style={style.chatMessages} ref="messages">
          {this.renderMessages()}
        </div>

        <ChatInput />
      </div>
    );
  },

  renderMessages() {
    return this.state.messages.map((message, i) => {
      return <ChatMessage message={message.toJS ? message.toJS() : message}
          key={`message-${i}`} />
    }).toJS();
  },

  scrollToBottom() {
    let node = this.refs.messages.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },

  updateMessages() {
    this.setState(this.getMessages());
  }
});

module.exports = ChatMessages;