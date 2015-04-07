'use strict';

if (typeof __TEST__ === 'undefined') {
  require('../../styles/chat_markdown.css');
}

const Avatar = require('../ui/avatar.jsx');
const boldize = require('../../lib/boldize');
const emoji = require('emojione');
const italicize = require('../../lib/italicize');
const React = require('react/addons');

const ChatMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.shape({
      avatar_url: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      html_body: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired,
      created_at: React.PropTypes.object.isRequired,
      last_online_at: React.PropTypes.object.isRequired
    }).isRequired
  },

  statics: {
    parse(body) {
      return emoji.shortnameToImage(body);
    }
  },

  componentDidMount() {
    // FIXME (pletcher): This is super gross, but we want to ensure that links
    // can escape the iframe. It would be better to move this kind of
    // processing to the server.

    let anchorTags = this.getDOMNode().getElementsByTagName('A');

    for (let i = 0, l = anchorTags.length; i < l; i++) {
      anchorTags[i].target = '_top';
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
          <h5 className="mt0 mb0">
            <a href={message.profile_url} className="black">
              {message.username}
            </a>
          </h5>
          <div className="chat-message" dangerouslySetInnerHTML={{__html: ChatMessage.parse(message.html_body)}} />
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
