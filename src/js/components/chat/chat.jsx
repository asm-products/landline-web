require('basscss/node_modules/flex-object/css/flex-object.min.css');

const ChatChannels = require('./chat_channels.jsx');
const ChatMessages = require('./chat_messages.jsx');
const React = require('react/addons');

const Chat = React.createClass({
  render() {
    let style = {
      chat: {
        right: 0,
        bottom: 0,
        left: 0,
        height: '100%',
        width: '100%'
      },

      chatChannels: {
        maxWidth: 220,
        minWidth: 220,
        overflowX: 'hidden',
        overflowY: 'auto'
      },

      chatMessages: {
        position: 'absolute',
        bottom: 0
      },

      chatWrapper: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    };

    return (
      <div style={style.chatWrapper}>
        <div className="flex flex-stretch" style={{height: '100%'}}>
          <div className="sm-show md-show lg-show bg-dark-gray white">
            <ChatChannels />
          </div>

          <div className="flex-auto">
            <ChatMessages />
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Chat;
