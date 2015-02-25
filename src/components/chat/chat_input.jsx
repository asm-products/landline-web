'use strict';

const ChatActions = require('../../actions/chat_actions');
const CurrentUserStore = require('../../stores/current_user_store');
const { Map } = require('immutable');
const React = require('react/addons');

const ENTER_KEY = 13;

const ChatInput = React.createClass({
  getInitialState() {
    return {
      body: '',
      user: CurrentUserStore.getUser()
    };
  },

  render() {
    let {
      body,
      user
    } = this.state;

    let style = {
      boxShadow: '-4px 0 15px rgba(0,0,0,.15)'
    }

    if (user.get('username')) {
      return (
        <div className="full-width shadow px3 py1" style={style}>
          <input type="text"
              className="full-width field-light mb0"
              onKeyPress={this.submitMessage}
              onChange={this.updateBody}
              value={body}
              placeholder="What do you want to say?" />
        </div>
      );
    }
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

  updateBody(e) {
    this.setState({
      body: e.target.value
    });
  }
});

module.exports = ChatInput;
