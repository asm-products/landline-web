'use strict';

const HomeHandlers = require('./handlers/home_handlers.js');
const Wegen = require('wegen');

const ROUTES = [
  ['/', HomeHandlers.showHome]
];

module.exports = new Wegen(ROUTES);
