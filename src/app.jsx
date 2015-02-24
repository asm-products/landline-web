'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/css/basscss.min.css');
}

const Home = require('./components/home/home.jsx')
const React = require('react/addons');
const UserActions = require('./actions/user_actions');

const App = React.createClass({
  render() {
    return <Home />;
  }
});

var Landline = (user, element) => {
  UserActions.logIn(user);

  React.render(
    <App />,
    element
  );
}

module.exports = Landline;
