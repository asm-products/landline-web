'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/css/basscss.min.css');
}

const $ = require('jquery');
const Home = require('./components/home/home.jsx')
const React = require('react/addons');
const UserActions = require('./actions/user_actions');
const url = require('url');

const App = React.createClass({
  render() {
    return <Home />;
  }
});

let Landline = (loc, element) => {
  let parsedUrl = url.parse(loc, true);
  let team = parsedUrl.query.team;

  $.get(`${LANDLINE_URL}/sessions/new?team=${team}`, (result) => {
    let token = result.token;

    $.ajax({
      url: `${LANDLINE_URL}/users/find`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      success(userObj) {
        let user = userObj.user;

        UserActions.logIn(user, token);
      },
      error(err) {}
    })
  });

  React.render(
    <App />,
    element
  );
}

module.exports = Landline;
