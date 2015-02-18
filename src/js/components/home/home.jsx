const Chat = require('../chat/chat.jsx');
const React = require('react/addons');

const Home = React.createClass({
  render() {
    return (
      <div className="container mt4">
        <Chat />
      </div>
    );
  }
});

module.exports = Home;
