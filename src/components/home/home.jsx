'use strict';

const Chat = require('../chat/chat.jsx');
const CurrentUserStore = require('../../stores/current_user_store');
const Login = require('../login/login.jsx');
const React = require('react/addons');

const Home = React.createClass({
  componentDidMount() {
    CurrentUserStore.addChangeListener(this.setLoggedIn);
  },

  componentWillUnmount() {
    CurrentUserStore.removeChangeListener(this.setLoggedIn);
  },

  getInitialState() {
    return {
      isLoggedIn: CurrentUserStore.isUserAuthenticated()
    };
  },

  render() {
    return this.state.isLoggedIn ? <Chat /> : <Login />;
  },

  setLoggedIn() {
    this.setState({
      isLoggedIn: CurrentUserStore.isUserAuthenticated()
    });
  }
});

module.exports = Home;
