const React = require('react/addons');

const ChatMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.shape({
      user: React.PropTypes.shape({
        username: React.PropTypes.string.isRequired
      }).isRequired,
      body: React.PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    let {
      user: { username },
      body
    } = this.props.message;

    return (
      <div className="clearfix">
        <div className="left mb2">
          <div className="bold mr2">{username}</div>
          {body}
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
