const keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    CHANGE_EVENT: null,
    CHAT_MESSAGE_SUBMITTED: null,
    ROUTE_CHANGED: null
  }),

  PayloadSources: keyMirror({
    CLIENT: null,
    SERVER: null
  })
};
