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
    let style = {
      avatar: {
        borderRadius: '50%',
        maxHeight: 30,
        maxWidth: 30
      }
    };

    return (
      <div className="mb1 clearfix">
        <div className="col col-1">
          <img className="left" src={message.avatar_url} width={24} style={style.avatar} />
        </div>
        <div className="col col-11 mxn1">
          <span className="bold block" style={style.username}>{message.Username}</span>
          <span className="block">{message.Body}</span>
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
