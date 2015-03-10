'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/node_modules/flex-object/css/flex-object.min.css');
}

const ChatChannels = require('./chat_channels.jsx');
const ChatMessages = require('./chat_messages.jsx');
const ChatPixel = require('./chat_pixel.jsx');
const React = require('react/addons');
const Router = require('react-router'); // or var Router = ReactRouter; in browsers


const Chat = React.createClass({
  mixins: [Router.State],
  componentWillReceiveProps() {
    this.setState({
      currentRoom: this.getParams().roomSlug
    });
  },

  getInitialState(){
    return {
      currentRoom:this.getParams().roomSlug
    };
  },

  render() {
    let style = {
      chat: {
        height: '100%'
      },

      chatChannels: {
        maxWidth: 220,
        minWidth: 220,
        overflowX: 'hidden',
        overflowY: 'auto'
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
        <div className="flex flex-stretch" style={style.chat}>
          <div className="sm-show md-show lg-show bg-dark-gray white" style={style.chatChannels}>
            <ChatChannels currentRoom={this.state.currentRoom} />
          </div>

          <div className="flex-auto" ref="messages">
            <ChatMessages currentRoom={this.state.currentRoom} />
          </div>
        </div>
        <ChatPixel />
      </div>
    );
  }
});

module.exports = Chat;
