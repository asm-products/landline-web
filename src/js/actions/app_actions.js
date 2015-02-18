const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Error = require('../components/errors/error.jsx');
const Home = require('../components/home/home.jsx');
const NProgress = require('nprogress');
const Wegen = require('wegen');

const ROUTES = [
  ['/', _showHome]
];

module.exports = new Wegen(ROUTES);

function _showHome(err, data, context) {
  Dispatcher.dispatch({
    actionType: ActionTypes.ROUTE_CHANGED,
    component: err ? Error : Home,
    context: context
  });
}
