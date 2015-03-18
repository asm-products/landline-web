'use strict';

const Avatar = require('../ui/avatar.jsx');
const marked = require('marked');
const React = require('react/addons');

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

  render() {
    let message = this.props.message;

    return (
      <div className="mb1 clearfix">
        <div className="col col-1">
          <Avatar url={message.avatar_url} />
        </div>
        <div className="col col-11">
          <span className="bold block h5">{message.username} <span className="regular silver ml2">{message.created_at.fromNow()}</span></span>
          <span className="block h5"
              dangerouslySetInnerHTML={{__html: marked(message.body)}} />
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
