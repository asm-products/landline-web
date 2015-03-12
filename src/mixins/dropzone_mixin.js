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

const DropzoneMixin = {
  componentDidMount() {
    this.dropzone = new Dropzone(this.getDOMNode(), {
      accept: this.onAccept(this.props.commentId),
      createImageThumbnails: false,
      sending: this.onSending,
      url: 'https://s3.amazonaws.com/__S3_BUCKET__'
    });

    AttachmentStore.addChangeListener(this.getAttachment);
    UploadingAttachmentsStore.addChangeListener(this.getUploadingAttachments);
  },

  componentWillUnmount() {
    this.dropzone = null;
  },

  getAttachment() {
    let commentId = this.props.commentId;
    let attachment = AttachmentStore.getAttachment(commentId);

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
    _.each(file.form, function(v, k) {
      formData.append(k, v);
    });
  }
};

module.exports = DropzoneMixin;
