'use strict';

const Chat = require('../chat/chat.jsx');
const CurrentUserStore = require('../../stores/current_user_store');
const Spinner = require('../spinner/spinner.jsx');
const React = require('react/addons');

const Router = require('react-router'); // or var Router = ReactRouter; in browsers

const Home = React.createClass({
  mixins: [Router.State],

  componentDidMount() {
    CurrentUserStore.addChangeListener(this.setLoggedIn);
  },

  componentWillUnmount() {
    CurrentUserStore.removeChangeListener(this.setLoggedIn);
  },

  componentWillReceiveProps() {
    this.setState({currentRoom: this.getParams().room});
  },

  getInitialState() {
    return {
      isLoggedIn: CurrentUserStore.isUserAuthenticated(),
      currentRoom: this.getParams().roomSlug
    };
  },

  render() {
    return this.state.isLoggedIn ? <Chat currentRoom={this.state.currentRoom} /> : <Spinner />;
  },

  setLoggedIn() {
    this.replaceState({
      isLoggedIn: CurrentUserStore.isUserAuthenticated()
    });
  }
});

module.exports = Home;
