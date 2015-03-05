'use strict';

const Avatar = require('../ui/avatar.jsx');
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
      <div className="mb1 clearfix">
        <div className="col col-1">
          <Avatar url={message.avatar_url} />
        </div>
        <div className="col col-11">
          <span className="bold block h5">{message.username}</span>
          <span className="block h5">{message.body}</span>
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
