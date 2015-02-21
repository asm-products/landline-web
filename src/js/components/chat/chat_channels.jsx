'use strict';

const ChatChannelsStore = require('../../stores/chat_channels_store');
const UsersStore = require('../../stores/users_store');
const React = require('react/addons');

const ChatChannels = React.createClass({
  componentDidMount() {
    ChatChannelsStore.addChangeListener(this.updateChannels);
    UsersStore.addChangeListener(this.updateUsers);
  },

  componentWillUnmount() {
    ChatChannelsStore.removeChangeListener(this.updateChannels);
    UsersStore.removeChangeListener(this.updateUsers);
  },

  getInitialState() {
    return {
      channels: ChatChannelsStore.getChannels(),
      users: UsersStore.getUsers()
    };
  },

  render() {
    return (
      <div className="p3">
        <h5 className="mt0 mb2">Channels</h5>
        {this.renderChannels()}

        <h5 className="py2">Users</h5>
        {this.renderUsers()}
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
        <a className="block clearfix white" key={url}>
          #{label}
        </a>
      );
    }).toJS();
  },

  renderUsers() {
    return this.state.users.map((user) => {
      let {
        username
      } = user;

      return (
        <a className="block clearfix white" href={username} key={username}>
          {username}
        </a>
      );
    }).toJS();
  },

  updateChannels() {
    this.setState({
      channels: ChatChannelsStore.getChannels()
    });
  },

  updateUsers() {
    this.setState({
      users: UsersStore.getUsers()
    });
  }
});

module.exports = ChatChannels;
