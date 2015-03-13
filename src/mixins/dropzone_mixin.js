'use strict';

if (typeof __TEST__ === 'undefined') {
  require('../styles/dropzone.css');
}

const ActionTypes = require('../constants').ActionTypes;
const AttachmentActions = require('../actions/attachment_actions');
const AttachmentStore = require('../stores/attachment_store');
const Dispatcher = require('../dispatcher');
const Dropzone = require('dropzone');
const UploadingAttachmentsStore = require('../stores/uploading_attachments_store');

Dropzone.autoDiscover = false;

const DropzoneMixin = {
  componentDidMount() {
    this.dropzone = new Dropzone(this.getDOMNode(), {
      accept: this.onAccept(this.props.commentId),
      clickable: false,
      sending: this.onSending,
      url: `https://s3.amazonaws.com/${__S3_BUCKET__}`
    });

    AttachmentStore.addChangeListener(this.getAttachments);
    UploadingAttachmentsStore.addChangeListener(this.getUploadingAttachments);
  },

  componentWillUnmount() {
    this.dropzone = null;
  },

  getAttachments() {
    let commentId = this.props.commentId;
    let attachment = AttachmentStore.getAttachments(commentId);

    if (attachment) {
      let currentText = this.state.body || '';
      let attachmentName = attachment.name;
      let newText = '[' + attachmentName + '](' + attachment.href + ')\n';

      if (/\.(gif|jpg|jpeg|png|psd)$/.test(attachmentName)) {
        newText = '!' + newText;
      }

      let replaceText = '![Uploading... ' + attachmentName + ']()';

      this.setState({
        body: currentText.replace(replaceText, newText)
      });
    }
  },

  getUploadingAttachments() {
    let commentId = this.props.commentId;
    let attachments = UploadingAttachmentsStore.getUploadingAttachments(commentId);

    if (attachments.length) {
      let newText = attachments.join(' ');
      let currentText = this.state.text || '';

      this.setState({
        body: currentText + newText
      });
    }
  },

  onAccept: AttachmentActions.uploadAttachment,

  onSending(file, xhr, formData) {
    for (let k in file.form) {
      formData.append(k, file.form[k]);
    }
  }
};

module.exports = DropzoneMixin;
