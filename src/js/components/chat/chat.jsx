const ChatInput = require('./chat_input.jsx');
const ChatMessage = require('./chat_message.jsx');
const ChatMessagesStore = require('../../stores/chat_messages_store');
const React = require('react/addons');

const Chat = React.createClass({
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
    return (
      <div className="p4 container">
        <div className="mb4 bg-white">
          {this.renderChatMessages()}
        </div>

        <ChatInput />
      </div>
    );
  },

  renderChatMessages() {
    return this.state.messages.map((message) => {
      return <ChatMessage message={message.toJS()} />
    }).toJS();
  },

  updateMessages() {
    this.setState(this.getMessages());
  }
});

module.exports = Chat;
