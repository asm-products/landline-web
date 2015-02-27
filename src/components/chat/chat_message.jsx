'use strict';

const React = require('react/addons');

const ChatMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.shape({
      body: React.PropTypes.string,
      Body: React.PropTypes.string,
      username: React.PropTypes.string,
      Username: React.PropTypes.string
    }).isRequired
  },

  render() {
    let message = this.props.message;

    return (
      <div className="mb1">
        <span className="bold block">{message.Username}</span>
        <span className="block">{message.Body}</span>
      </div>
    );
  }
});

module.exports = ChatMessage;
