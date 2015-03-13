'use strict';

const $ = require('jquery');
const ActionTypes = require('../constants').ActionTypes;
const AppStore = require('../stores/app_store');
const CurrentUserStore = require('../stores/current_user_store');
const Dispatcher = require('../dispatcher');

class AttachmentActionCreators {
  uploadAttachment(commentId) {
    let handler = (file, done) => {
      _upload(commentId, file, done);
    }

    return handler;
  }
};


module.exports = new AttachmentActionCreators();

function _upload(commentId, file, done) {
  Dispatcher.dispatch({
    actionType: ActionTypes.ATTACHMENT_UPLOADING,
    commentId: commentId,
    text: '![Uploading... ' + file.name + ']()'
  });

  $.ajax({
    url: `${AppStore.getUrl()}/upload`,
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify({
      name: file.name,
      content_type: file.type,
      size: file.size
    }),
    headers: {
      Authorization: `Bearer ${CurrentUserStore.getToken()}`,
      'Content-Type': 'application/json'
    },
    success(attachment) {
      file.form = attachment.form;
      attachment.name = file.name;

      Dispatcher.dispatch({
        actionType: ActionTypes.ATTACHMENT_UPLOADED,
        commentId: commentId,
        attachment: attachment
      });

      done();
    },
    error(jqXhr, textStatus, err) {
      Dispatcher.dispatch({
        actionType: ActionTypes.ATTACHMENT_FAILED,
        commentId: commentId,
        error: err
      });

      done();
    }
  });
}
