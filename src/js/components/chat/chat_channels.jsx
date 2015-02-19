'use strict';

const ChatChannelsStore = require('../../stores/chat_channels_store');
const React = require('react/addons');

const ChatChannels = React.createClass({
  componentDidMount() {
    ChatChannelsStore.addChangeListener(this.updateChannels);
  },

  componentWillUnmount() {
    ChatChannelsStore.removeChangeListener(this.updateChannels);
  },

  getChannels() {
    return {
      channels: ChatChannelsStore.getChannels()
    };
  },

  getInitialState() {
    return this.getChannels();
  },

  render() {
    return (
      <div className="p3">
        <h5 className="mt0 mb2">Channels</h5>
        {this.renderChannels()}
      </div>
    );
  },

  renderChannels() {
    return this.state.channels.map((channel) => {
      let {
        label,
        url
      } = channel;

      return (
        <a className="block clearfix white" href={url} key={url}>
          #{label}
        </a>
      );
    }).toJS();
  },

  updateChannels() {
    this.setState(this.getChannels());
  }
});

module.exports = ChatChannels;
