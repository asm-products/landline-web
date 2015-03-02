'use strict';

const ChatChannelsStore = require('../stores/chat_channels_store');

module.exports = {
  componentDidMount() {
    ChatChannelsStore.addChangeListener(this.setChannel);
  },

  componentWillUnmount() {
    ChatChannelsStore.removeChangeListener(this.setChannel);
  },

  getChannel() {
    return ChatChannelsStore.getCurrentChannel();
  },

  setChannel() {
    this.setState({
      channel: this.getChannel()
    });
  }
};
