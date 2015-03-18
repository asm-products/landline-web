'use strict';

const Avatar = require('../ui/avatar.jsx');
const marked = require('marked');
const React = require('react/addons');

const ChatMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.shape({
      avatar_url: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    let message = this.props.message;

    return (
      <div className="clearfix">
        <div className="left mr2">
          <Avatar url={message.avatar_url} />
        </div>
        <div className="overflow-hidden">
          <h5 className="mt0 mb0">{message.username}</h5>
          <div dangerouslySetInnerHTML={{__html: marked(message.body)}} />
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
