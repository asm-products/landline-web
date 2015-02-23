'use strict';

const ActionTypes = require('../../constants').ActionTypes;
const Dispatcher = require('../../dispatcher');
const Error = require('../../components/errors/error.jsx');
const Home = require('../../components/home/home.jsx');

function showHome(err, data, context) {
  Dispatcher.dispatch({
    actionType: ActionTypes.ROUTE_CHANGED,
    component: err ? Error : Home,
    context: context
  });
}

module.exports = {
  showHome: showHome
};
