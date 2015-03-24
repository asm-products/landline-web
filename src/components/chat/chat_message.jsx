'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/css/basscss.min.css');
  require('../../styles/chat_markdown.css');
}

const Avatar = require('../ui/avatar.jsx');
const boldize = require('../../lib/boldize');
const emoji = require('emojione');
const italicize = require('../../lib/italicize');
const React = require('react/addons');
const urlize = require('../../lib/urlize');

const ChatMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.shape({
      avatar_url: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired,
      created_at: React.PropTypes.object.isRequired,
      last_online_at: React.PropTypes.object.isRequired
    }).isRequired
  },

  statics: {
    parse(body) {
      return emoji.shortnameToImage(italicize(boldize(urlize(body))) || '');
    }
  },

  render() {
    let message = this.props.message;
    return (
      <div className="clearfix mt1">
        <div className="left mr1">
          <Avatar url={message.avatar_url} />
        </div>
        <div className="overflow-hidden">
          <h5 className="mt0 mb0">{message.username}</h5>
          <div className="chat-message" dangerouslySetInnerHTML={{__html: ChatMessage.parse(message.html_body)}} />
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
