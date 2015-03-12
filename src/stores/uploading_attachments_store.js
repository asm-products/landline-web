'use strict';

const ActionTypes = require('../constants').ActionTypes;
const assign = require('object-assign');
const Dispatcher = require('../dispatcher');
const Store = require('./store');

// TODO: (pletcher) use Immutable data structures

let currentAttachments = {};

class UploadingAttachmentsStore extends Store {
  constructor() {
    super();

    this.dispatchToken = Dispatcher.register((action) => {
      switch(action.actionType) {
        case ActionTypes.ATTACHMENT_UPLOADING:
          addAttachment(action);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getUploadingAttachments(commentId) {
    let attachments = currentAttachments[commentId] || [];
    currentAttachments[commentId] = [];

    return attachments;
  }
};

function addAttachment(action) {
  let text = action.text;
  let commentId = action.commentId;

  if (text) {
    if (currentAttachments[commentId]) {
      currentAttachments[commentId].push(text);
    } else {
      currentAttachments[commentId] = [text];
    }
  }
}

module.exports = new UploadingAttachmentsStore()
