'use strict';

const UserActions = require('../../actions/user_actions');
const React = require('react/addons');

const Login = React.createClass({
  getInitialState() {
    return {
      actionCreator: new UserActions(),
      loggingIn: false,
      username: ''
    };
  },

  handleInputChange(e) {
    this.setState({
      username: e.target.value
    });
  },

  handleLogIn(e) {
    e.preventDefault();

    let username = this.state.username;

    if (username.length >= 2) {
      this.state.actionCreator.logIn(username);
      this.setState({
        loggingIn: true
      });
    }
  },

  render() {
    let style = {
      margin: 'auto',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '50%',
      height: 200,
    };

    let styleInner = {
      position: 'relative',
      top: '40%'
    };

    return (
      <div className="border bg-white center" style={style}>
        <div style={styleInner}>
          <input type="text"
              className="field-light mb0"
              onChange={this.handleInputChange}
              placeholder="Username"
              value={this.state.username} />
          {this.renderButton()}
        </div>
      </div>
    );
  },

  renderButton() {
    if (this.state.loggingIn) {
      return <a className="button button-gray disabled">Logging in</a>;
    }

    return <a className="button button-red" onClick={this.handleLogIn}>Log in</a>;
  }
});

module.exports = Login;
