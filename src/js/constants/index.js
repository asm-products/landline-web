'use strict';

const keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    CHAT_CHANNELS_RECEIVE: null,
    CHANGE_EVENT: null,
    CHAT_MESSAGE_SUBMITTED: null,
    ROUTE_CHANGED: null
  }),

  PayloadSources: keyMirror({
    CLIENT: null,
    SERVER: null
  })
};
