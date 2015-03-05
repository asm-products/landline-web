'use strict';

const AppStore = require('../../stores/app_store');
const ChatActions = require('../../actions/chat_actions');
const ChatChannelsStore = require('../../stores/chat_channels_store');
const CurrentUserStore = require('../../stores/current_user_store');
const Icon = require('../ui/icon.jsx');
const React = require('react/addons');
const UserActions = require('../../actions/user_actions');
const UsersStore = require('../../stores/users_store');

const ChatChannels = React.createClass({
  componentDidMount() {
    ChatChannelsStore.addChangeListener(this.updateChannels);
    UsersStore.addChangeListener(this.updateUsers);

    let url = AppStore.getUrl();
    let token = CurrentUserStore.getToken();

    ChatActions.getChannels(
      `${url}/rooms?r=1&t=1`,
      token
    );
    UserActions.init(
      `${url}/users?t=1`,
      token
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
    let style = {
      hr: {
        borderColor: 'rgba(0,0,0,0.1)'
      }
    };

    return (
      <div className="white">
        <h4 className="mt3 px3 light-gray">Landline</h4>

        <hr className="mt2 mb0" style={style.hr} />

        <h5 className="px3 mt2 mb1 light-gray">Channels</h5>
        {this.renderChannels()}

        <hr className="mt2 mb0" style={style.hr} />

        <h5 className="px3 mt2 mb1 light-gray">People</h5>
        {this.renderUsers()}
      </div>
    );
  },

  renderChannels() {
    return this.state.channels.map((channel) => {
      let label = channel.slug;
      let url = `${AppStore.getUrl()}/rooms/${label}`;

      return (
        <a className="block white px3 h5 light-gray" href={url} key={url}>#{label}</a>
      );
    }).toJS();
  },

  renderUsers() {
    return this.state.users.map((user, i) => {
      let username = user.username;
      if (username) {
        let style = {
          lineHeight: '1.4rem'
        };

        return (
          <span className="block clearfix light-gray h5 px3" key={`${i}`} style={style}>
            @{username}
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
