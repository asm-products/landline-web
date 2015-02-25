'use strict';

const React = require('react/addons');

const ChatMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.shape({
      body: React.PropTypes.string.isRequired,
      user: React.PropTypes.shape({
        username: React.PropTypes.string,
        Username: React.PropTypes.string
      }).isRequired
    }).isRequired
  },

  render() {
    let {
      user: { Username: username },
      body
    } = this.props.message;

    return (
      <div className="mb1">
        <span className="bold block">{username}</span>
        <span className="block">{body}</span>
      </div>
    );
  }
});

module.exports = ChatMessage;
