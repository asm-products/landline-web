'use strict';

const Chat = require('../chat/chat.jsx');
const CurrentUserStore = require('../../stores/current_user_store');
const React = require('react/addons');
const Router = require('react-router');
const SocketStore = require('../../stores/socket_store');
const Spinner = require('../ui/spinner.jsx');

const Home = React.createClass({
  mixins: [Router.State],

  componentDidMount() {
    CurrentUserStore.addChangeListener(this.setLoggedIn);
    SocketStore.addChangeListener(this.setSocketState);
  },

  componentWillUnmount() {
    CurrentUserStore.removeChangeListener(this.setLoggedIn);
  },

  getInitialState() {
    return {
      isLoggedIn: CurrentUserStore.isUserAuthenticated(),
      isSocketConnected: SocketStore.getConnected(),
      isSocketAuthenticated: SocketStore.getAuthenticated(),
    };
  },

  render() {
    let isReady = this.state.isLoggedIn &&
      this.state.isSocketConnected &&
      this.state.isSocketAuthenticated;
    return isReady ?
      <Chat currentRoom={this.getParams().room} /> :
      <Spinner />;
  },

  setLoggedIn() {
    this.setState({
      isLoggedIn: CurrentUserStore.isUserAuthenticated()
    });
  },

  setSocketState(){
    this.setState({
      isSocketConnected: SocketStore.getConnected(),
      isSocketAuthenticated: SocketStore.getAuthenticated()
    });
  }
});

module.exports = Home;
