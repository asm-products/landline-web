'use strict';

const UserActions = require('../../actions/user_actions');
const React = require('react/addons');

const Login = React.createClass({
  getInitialState() {
    return {
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
      UserActions.logIn(username);
      this.setState({
        loggingIn: true
      });
    }
  },

  render() {
    return (
      <div className="bg-white rounded shadow center mx-auto p2 mt2 sm-col-11 md-col-6">
        <h1 className="dark-gray regular">Landline</h1>
        <h2 className="mt1 py1 mid-gray regular">Enter a username to get started:</h2>
        <div className="mb2">
          <input type="text"
              className="field-light mb0 mr2"
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
      return <a className="button disabled">Logging in</a>;
    }

    return <a className="button button-red" onClick={this.handleLogIn}>Log in</a>;
  }
});

module.exports = Login;
