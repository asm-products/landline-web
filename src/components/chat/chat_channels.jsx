'use strict';

const AppStore = require('../../stores/app_store');
const ChatActions = require('../../actions/chat_actions');
const ChatChannelsStore = require('../../stores/chat_channels_store');
const CurrentUserStore = require('../../stores/current_user_store');
const React = require('react/addons');
const UserActions = require('../../actions/user_actions');
const UsersStore = require('../../stores/users_store');

const ChatChannels = React.createClass({
  componentDidMount() {
    ChatChannelsStore.addChangeListener(this.updateChannels);
    UsersStore.addChangeListener(this.updateUsers);
    UserActions.init(
      `${AppStore.getUrl()}/users?t=1`,
      CurrentUserStore.getToken()
    );
  },

  componentDidUpdate() {
    ChatActions.getPixel(
      `${AppStore.getUrl()}/rooms/${this.state.currentChannel}`,
      CurrentUserStore.getToken()
    );
  },

  componentWillUnmount() {
    ChatChannelsStore.removeChangeListener(this.updateChannels);
    UsersStore.removeChangeListener(this.updateUsers);
  },

  getInitialState() {
    return {
      currentChannel: ChatChannelsStore.getCurrentChannel(),
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
      let username = user.username;
      if (username) {
        return (
          <span className="block clearfix white" key={`${i}`}>
            {username}
          </span>
        );
      }
    }).toJS();
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentChannel !== this.state.currentChannel) {
      ChatActions.getPixel(
        `${AppStore.getUrl()}/rooms/${this.state.currentChannel}`,
        CurrentUserStore.getToken()
      );
      return true;
    }

    if (nextState.users.size !== this.state.users.size) {
      return true;
    }

    return false;
  },

  updateChannels() {
    this.setState({
      currentChannel: ChatChannelsStore.getCurrentChannel(),
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
