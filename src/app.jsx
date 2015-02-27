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
  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  render() {
    return <Home url={this.props.url} />;
  }
});

let Landline = (loc, apiUrl, element) => {
  let parsedUrl = url.parse(loc, true);
  let team = parsedUrl.query.team;

  $.get(`${apiUrl}/sessions/new?team=${team}`, (result) => {
    let token = result.token;

    $.ajax({
      url: `${apiUrl}/users/find`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      success(userObj) {
        let user = userObj.user;

        UserActions.logIn(user, token);
      },
      error(err) {}
    });
  });

  React.render(
    <App url={apiUrl} />,
    element
  );
};

module.exports = Landline;
