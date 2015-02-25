'use strict';

const UserActions = require('../../actions/user_actions');
const React = require('react/addons');

if (typeof __TEST__ === 'undefined') {
  require('../../styles/spinner.css');
}

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

    return (
      <div className="bg-white center" style={style}>
        <div className="spinner-rects">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
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
