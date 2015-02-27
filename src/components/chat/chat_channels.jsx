'use strict';

const ChatChannelsStore = require('../../stores/chat_channels_store');
const React = require('react/addons');
const UserActions = require('../../actions/user_actions');
const UsersStore = require('../../stores/users_store');

const ChatChannels = React.createClass({
  componentDidMount() {
    ChatChannelsStore.addChangeListener(this.updateChannels);
    UsersStore.addChangeListener(this.updateUsers);
    UserActions.init();
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
      <div className="p3 white">
        <h1 className="mt0 regular">Landline</h1>
        {/*<h5 className="mt0 mb1 caps light-gray">Channels</h5>
        {this.renderChannels()}*/}

        <h5 className="mt2 mb1 caps light-gray">Users</h5>
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
        <a className="block white" key={url}>#{label}</a>
      );
    }).toJS();
  },

  renderUsers() {
    return this.state.users.map((user, i) => {
      let {
        username
      } = user;

      return (
        <a className="block clearfix white" key={`${username}-${i}`}>
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
