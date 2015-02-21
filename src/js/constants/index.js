'use strict';

const keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    CHAT_CHANNELS_RECEIVED: null,
    CHANGE_EVENT: null,
    CHAT_MESSAGE_RECEIVED: null,
    CHAT_MESSAGE_SUBMITTED: null,
    CHAT_MESSAGES_RECEIVED: null,
    CURRENT_USER_RECEIVED: null,
    ROUTE_CHANGED: null,
    TOKEN_RECEIVED: null,
    USER_RECEIVED: null,
    USERS_RECEIVED: null
  }),

  PayloadSources: keyMirror({
    CLIENT: null,
    SERVER: null
  })
};
