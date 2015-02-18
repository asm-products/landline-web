const ChatActions = require('../../actions/chat_actions');
const { Map } = require('immutable');
const React = require('react/addons');

const ENTER_KEY = 13;

const ChatInput = React.createClass({
  getInitialState() {
    return {
      body: '',
      tempUsername: '',
      user: Map()
    };
  },

  render() {
    let { body, user, tempUsername } = this.state;

    if (user.get('username')) {
      return (
        <input type="text"
            className="block full-width field-light"
            onKeyPress={this.submitMessage}
            onChange={this.updateBody}
            value={body}
            placeholder="Enter your message" />
      );
    }

    return (
      <input type="text"
          className="block full-width field-light"
          onKeyPress={this.submitTempUsername}
          onChange={this.updateTempUsername}
          value={tempUsername}
          placeholder="Enter a username" />
    );
  },

  submitMessage(e) {
    if (e.which === ENTER_KEY) {
      e.stopPropagation();

      ChatActions.submitMessage(
        Map({
          user: this.state.user,
          body: this.state.body
        })
      );

      this.setState({
        body: ''
      });
    }
  },

  submitTempUsername(e) {
    if (e.which === ENTER_KEY) {
      e.stopPropagation();

      let user = this.state.user;

      this.setState({
        user: user.set('username', this.state.tempUsername),
        tempUsername: ''
      });
    }
  },

  updateBody(e) {
    this.setState({
      body: e.target.value
    });
  },

  updateTempUsername(e) {
    this.setState({
      tempUsername: e.target.value
    });
  }
});

module.exports = ChatInput;
