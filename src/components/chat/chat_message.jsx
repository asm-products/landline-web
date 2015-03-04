'use strict';

const Avatar = require('../ui/avatar.jsx');
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
      <div className="mb1 clearfix">
        <div className="col col-1">
          <Avatar url={message.avatar_url} />
        </div>
        <div className="col col-11 mxn1">
          <span className="bold block">{message.Username}</span>
          <span className="block">{message.Body}</span>
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
