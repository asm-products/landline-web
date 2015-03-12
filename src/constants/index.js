'use strict';

const keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    APP_INITIALIZED: null,
    ATTACHMENT_FAILED: null,
    ATTACHMENT_UPLOADED: null,
    ATTACHMENT_UPLOADING: null,
    CHAT_CHANNEL_RECEIVED: null,
    CHAT_CHANNELS_RECEIVED: null,
    CHANGE_EVENT: null,
    CHAT_MESSAGE_RECEIVED: null,
    CHAT_MESSAGE_SUBMITTED: null,
    CHAT_MESSAGES_RECEIVED: null,
    CHAT_PIXEL_RECEIVED: null,
    CURRENT_USER_RECEIVED: null,
    LOGIN_FAILED: null,
    MEMBERSHIP_DESTROYED: null,
    MEMBERSHIP_RECEIVED: null,
    TYPEAHEAD_USERNAME_SELECTED: null,
    USER_RECEIVED: null,
    USERS_RECEIVED: null
  }),

  PayloadSources: keyMirror({
    CLIENT: null,
    SERVER: null
  })
};
