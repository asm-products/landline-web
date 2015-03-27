'use strict';

const AppStore = require('../../stores/app_store');
const ChatActions = require('../../actions/chat_actions');
const ChatInput = require('./chat_input.jsx');
const ChatMessage = require('./chat_message.jsx');
const ChatMessagesStore = require('../../stores/chat_messages_store');
const CurrentUserStore = require('../../stores/current_user_store');
const React = require('react/addons');
const { State } = require('react-router');
const Timestamp = require('../ui/timestamp.jsx');

const ChatMessages = React.createClass({
  mixins: [State],

  componentDidMount() {
    ChatMessagesStore.addChangeListener(this.updateMessages);
    ChatActions.init();

    this.refs.messages.getDOMNode()
    .addEventListener('scroll', this.handleScroll);

    this.scrollToBottom();
  },

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  },

  componentWillReceiveProps(p) {
    this.setState({
      room: this.getParams().roomSlug
    }, () => {
      this.updateMessages();
    });
  },

  componentWillUpdate() {
    let node = this.refs.messages.getDOMNode();
    // magic number :(
    // After scrolling, it seems like the scroll value is sometimes off by one;
    // the ||-check makes sure we catch that.
    this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight ||
      node.scrollHeight - (node.scrollTop + node.offsetHeight) === 1;
  },

  fetchOlderChatMessages() {
    let lastMessage = this.state.messages.last();
    let timestamp = lastMessage.created_at && lastMessage.created_at.format();

    ChatActions.fetchMessagesBeforeTimestamp(this.state.room, timestamp);
  },

  getInitialState() {
    return {
      room: this.getParams().roomSlug,
      messages: ChatMessagesStore.getMessages(this.getParams().roomSlug)
    };
  },

  getMessages() {
    return {
      room: this.getParams().roomSlug,
      messages: ChatMessagesStore.getMessages(this.getParams().roomSlug)
    };
  },

  handleScroll(e) {
    if (e.currentTarget.scrollTop < 150) {
      this.fetchOlderChatMessages();
    }
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
        <div className="flex-auto left-align p2 mb2" style={style.chatMessages} ref="messages">
          {this.renderMessages()}
        </div>
        <ChatInput currentRoom={this.state.room} />
      </div>
    );
  },

  renderMessages() {
    let { messages } = this.state;
    let numberOfMessages = messages.size;

    return this.state.messages.reverse().map((message, i) => {
      if (i + 1 === numberOfMessages) {
        let timestamp = message.created_at;
        return [
          <Timestamp time={timestamp} />,
          <ChatMessage message={message.toJS ? message.toJS() : message}
              key={`message-${i}`} />
        ];
      }

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
