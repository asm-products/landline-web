'use strict';

const ChatPixelStore = require('../../stores/chat_pixel_store');
const React = require('react/addons');

const ChatPixel = React.createClass({
  componentDidMount() {
    ChatPixelStore.addChangeListener(this.getSrc);
  },

  componentWillUnmount() {
    ChatPixelStore.removeChangeListener(this.getSrc);
  },

  getInitialState() {
    return {
      src: ChatPixelStore.getPixelSrc()
    };
  },

  getSrc() {
    this.setState({
      src: ChatPixelStore.getPixelSrc()
    });
  },

  render() {
    return <img src={this.state.src} className="hidden" />;
  }
});

module.exports = ChatPixel;
