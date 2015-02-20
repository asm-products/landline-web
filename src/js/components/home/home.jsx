'use strict';

const Chat = require('../chat/chat.jsx');
const CurrentUserStore = require('../../stores/current_user_store');
const React = require('react/addons');

const Home = React.createClass({
  render() {
    return <Chat />;
  }
});

module.exports = Home;
