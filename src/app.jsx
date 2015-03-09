'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/css/basscss.min.css');
}

const $ = require('jquery');

const Router = require('react-router'); // or var Router = ReactRouter; in browsers
const DefaultRoute = Router.DefaultRoute;
const Link = Router.Link;
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;
const Redirect = Router.Redirect;

const AppActions = require('./actions/app_actions');
const AppStore = require('./stores/app_store');
const Home = require('./components/home/home.jsx')
const React = require('react/addons');
const UserActions = require('./actions/user_actions');
const url = require('url');


const App = React.createClass({
  render() {
    return <RouteHandler />;
  }
});

const routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="chat" path="/rooms/:roomSlug" handler={Home}/>
        <Redirect from="/" to="chat" params={{roomSlug: "general"}} />
    </Route>
)

let Landline = (loc, apiUrl, element) => {
  let parsedUrl = url.parse(loc, true);
  let team = parsedUrl.query.team;

  AppActions.init(apiUrl);

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

  Router.run(routes, (Handler) => {
      React.render(<Handler/>, element);
  })
};

module.exports = Landline;
