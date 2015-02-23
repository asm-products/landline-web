'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/css/basscss.min.css');
}

const Home = require('./components/home/home.jsx')
const React = require('react/addons');

const App = React.createClass({
  render() {
    return <Home />;
  }
});

var Landline = (id) => {
  React.render(
    <App />,
    document.getElementById(id)
  );
}

module.exports = Landline;
