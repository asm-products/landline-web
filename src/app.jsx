'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/css/basscss.css');
  require('./styles/typography.css');
}

const $ = require('jquery');
const AppActions = require('./actions/app_actions');
const AppStore = require('./stores/app_store');
const Home = require('./components/home/home.jsx')
const React = require('react/addons');
const Router = require('react-router');
const SocketActions = require('./actions/socket_actions');
const UserActions = require('./actions/user_actions');
const url = require('url');

const DefaultRoute = Router.DefaultRoute;
const Link = Router.Link;
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;
const Redirect = Router.Redirect;

const App = React.createClass({
  render() {
    return <RouteHandler />;
  }
});

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="chat" path="/rooms/:roomSlug" handler={Home} />
    <Redirect from="/" to="chat" params={{roomSlug: "general"}} />
  </Route>
);

let Landline = (loc, element) => {
  let parsedUrl = url.parse(loc, true);
  let room = parsedUrl.query.room || 'general';
  let team = parsedUrl.query.team;
  let uid = parsedUrl.query.uid || '';

  AppActions.init(__API_URL__);
  SocketActions.init(__API_URL__);

  $.ajax({
    url: `${__API_URL__}/sessions/new?team=${team}&uid=${uid}`,
    method: 'GET',
    success(result) {
      let token = result.token;

      $.ajax({
        url: `${__API_URL__}/users/find`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
        success(userObj) {
          let user = userObj.user;

          window.location.hash = `rooms/${room}`;
          UserActions.logIn(user, token);
          SocketActions.auth(token);
        },
        error(err) {}
      });
    },
    error(err) {
      console.log(arguments);
    }
  });

  Router.run(routes, (Handler) => {
    React.render(<Handler />, element);
  });
};

module.exports = Landline;
