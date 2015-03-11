'use strict';

const Chat = require('../chat/chat.jsx');
const CurrentUserStore = require('../../stores/current_user_store');
const SocketStore = require('../../stores/socket_store');
const Spinner = require('../spinner/spinner.jsx');
const React = require('react/addons');

const Router = require('react-router'); // or var Router = ReactRouter; in browsers

const Home = React.createClass({
  mixins: [Router.State],

  componentDidMount() {
    CurrentUserStore.addChangeListener(this.setLoggedIn);
    SocketStore.addChangeListener(this.setSocketState);
  },

  componentWillUnmount() {
    CurrentUserStore.removeChangeListener(this.setLoggedIn);
  },

  componentWillReceiveProps() {
    this.setState({
        currentRoom: this.getParams().room
    });
  },

  getInitialState() {
    return {
      isLoggedIn: CurrentUserStore.isUserAuthenticated(),
      isSocketConnected: SocketStore.getConnected(),
      isSocketAuthenticated: SocketStore.getAuthenticated(),
      currentRoom: this.getParams().roomSlug
    };
  },

  render() {
    var isReady = this.state.isLoggedIn && this.state.isSocketConnected && this.state.isSocketAuthenticated;
    return isReady ? <Chat currentRoom={this.state.currentRoom} /> : <Spinner />;
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
