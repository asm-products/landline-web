'use strict';

const Dispatcher = require('flux').Dispatcher;

class AppDispatcher extends Dispatcher {
  dispatch(payload) {
    if (!payload.actionType) {
      console.error('Cannot dispatch undefined actionType.');
      // don't break in IE < 11 or Safari < 7.0.1, but try
      // to provide a stack trace if available
      console.trace && console.trace();
      return;
    }

    super.dispatch(payload);
  }
};

module.exports = new AppDispatcher();
