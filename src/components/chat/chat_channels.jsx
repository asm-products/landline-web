'use strict';

const AppStore = require('../../stores/app_store');
const ChatActions = require('../../actions/chat_actions');
const ChatChannelMembershipsStore = require('../../stores/chat_channel_memberships_store');
const ChatChannelsStore = require('../../stores/chat_channels_store');
const CurrentUserStore = require('../../stores/current_user_store');
const Icon = require('../ui/icon.jsx');
const { is } = require('immutable');
const Modal = require('../ui/modal.jsx');
const React = require('react/addons');
const Router = require('react-router');
const UserActions = require('../../actions/user_actions');
const UsersStore = require('../../stores/users_store');

const { Link } = Router;

const ONE_HOUR = 60 * 60 * 60 * 1000;

const ChatChannels = React.createClass({
  mixins: [Router.State],
  componentDidMount() {
    ChatChannelsStore.addChangeListener(this.updateChannels);
    ChatChannelMembershipsStore.addChangeListener(this.updateChannels);
    UsersStore.addChangeListener(this.updateUsers);

    let url = __API_URL__;
    let token = CurrentUserStore.getToken();

    this.getChannels();
    UserActions.init(
      `${url}/users?t=1`,
      token
    );
  },

  componentDidUpdate() {
    ChatActions.getPixel(
      `${__API_URL__}/rooms/${this.state.currentChannel}`,
      CurrentUserStore.getToken()
    );
  },

  componentWillUnmount() {
    ChatChannelsStore.removeChangeListener(this.updateChannels);
    ChatChannelMembershipsStore.removeChangeListener(this.updateChannels);
    UsersStore.removeChangeListener(this.updateUsers);
  },

  componentWillReceiveProps() {
    this.setState({
      currentChannel: this.getParams().roomSlug
    });
  },

  getChannels() {
    let url = __API_URL__;
    let token = CurrentUserStore.getToken();

    ChatActions.getChannels(
      `${url}/rooms?r=1&t=1`,
      token
    );
  },

  getInitialState() {
    return {
      currentChannel: this.getParams().roomSlug,
      channels: ChatChannelsStore.getChannels(),
      isModalOpen: false,
      subscribedChannels: ChatChannelsStore.getSubscribedChannels(),
      users: UsersStore.getUsers()
    };
  },

  handleJoinChannel(channel, e) {
    e.stopPropagation();

    ChatActions.joinChannel(channel);
  },

  handleLeaveChannel(channel, e) {
    e.stopPropagation();

    ChatActions.leaveChannel(channel);
  },

  handleModalDismissed() {
    this.setState({
      isModalOpen: false
    });
  },

  handleSeeAllChannels(e) {
    e.preventDefault();

    this.setState({
      isModalOpen: true
    });
  },

  render() {
    let style = {
      hr: {
        borderColor: 'rgba(0,0,0,0.1)'
      },
      span: {
        cursor: 'pointer'
      }
    };

    return (
      <div className="white">
        {/*<h4 className="mt3 px3 light-gray">{AppStore.getTeamName()}</h4>
        <hr className="mt2 mb0" style={style.hr} />*/}

        <h4 className="px3 mt2 mb1 light-gray">Rooms</h4>
        {this.renderRooms()}

        <h5 className="px3 mt1 mb1 light-gray">
          <span onClick={this.handleSeeAllChannels} style={style.span}>See all</span>
        </h5>
        <hr className="mt2 mb0" style={style.hr} />

        <h4 className="px3 mt2 mb1 light-gray">People</h4>
        {this.renderUsers()}
        {this.renderJoinModal()}
        {this.renderModal()}
      </div>
    );
  },

  renderAllChannels() {
    let style = {
      maxHeight: 300,
      overflowY: 'scroll'
    };

    return this.state.channels.map((channel) => {
      let label = channel.slug;

      return (
        <div className="clearfix mb2" style={style} key={label}>
          <div className="left h5 dark-gray mt1 ml2">
            {label}
          </div>

          <div className="right h5">
            {this.renderJoinOrLeaveButton(channel)}
          </div>
        </div>
      );
    }).toJS();
  },

  renderJoinOrLeaveButton(channel) {
    let label = channel.slug;
    let subscribedChannels = this.state.subscribedChannels;

    if (this.state.subscribedChannels.contains(channel)) {
      return (
        <button className="button-outline blue"
            onClick={this.handleLeaveChannel.bind(this, label)}>
          Leave
        </button>
      );
    }

    return (
      <button className="button"
          onClick={this.handleJoinChannel.bind(this, label)}>
        Join
      </button>
    );
  },

  renderJoinModal() {
    let currentChannel = this.state.currentChannel;
    let condition = (value, key, iterable) => {
      return value.slug === currentChannel
    };

    return (
      <div className="dark-gray">
        <Modal header={`Join ${currentChannel}?`}
            isOpen={!this.state.subscribedChannels.find(condition) && !this.state.isModalOpen}
            onDismiss={this.handleJoinChannel.bind(this, currentChannel)}
            theme="dark-gray">
          {this.renderNotSubscribedWarning()}
        </Modal>
      </div>
    );
  },

  renderModal() {
    return (
      <div className="dark-gray">
        <Modal header="Rooms"
            isOpen={this.state.isModalOpen}
            onDismiss={this.handleModalDismissed}
            theme="dark-gray">
          {this.renderAllChannels()}
        </Modal>
      </div>
    );
  },

  renderNotSubscribedWarning() {
    let currentChannel = this.state.currentChannel;
    return (
      <div className="clearfix mb2 center">
        You&#39;re about to join <span className="bold">#{currentChannel}</span>.
        <div>
          <button className="button"
              onClick={this.handleJoinChannel.bind(this, currentChannel)}>
            OK
          </button>
        </div>
      </div>
    );
  },

  renderOnlineIndicator(lastOnlineAt) {
    if (Date.now() - new Date(lastOnlineAt) < ONE_HOUR) {
      let style = {
        backgroundColor: '#33D6A6',
        borderRadius: '50%',
        display: 'inline-block',
        height: 8,
        lineHeight: '.5',
        textAlign: 'center',
        width: 8
      };
      return <span style={style} />;
    }
  },

  renderRooms() {
    let style = {
      cursor: 'pointer'
    };

    return this.state.subscribedChannels.map((channel) => {
      let label = channel.slug;

      return (
        <Link to="chat"
            params={{roomSlug: label}}
            key={label}
            className="block mb1 px3 h5 light-gray">
          #{label}
        </Link>
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
          <a href={user.profile_url} className="block clearfix light-gray h5 px3" key={`${i}`} style={style}>
            @{username} {this.renderOnlineIndicator(user.last_online_at)}
          </a>
        );
      }
    }).toJS();
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentChannel !== this.state.currentChannel) {
      ChatActions.getPixel(
        `${__API_URL__}/rooms/${this.state.currentChannel}`,
        CurrentUserStore.getToken()
      );
      return true;
    }

    if (!is(nextState.channels, this.state.channels)) {
      return true;
    }

    if (!is(nextState.subscribedChannels, this.state.subscribedChannels)) {
      return true;
    }

    if (nextState.users.size !== this.state.users.size) {
      return true;
    }

    if (nextState.isModalOpen !== this.state.isModalOpen) {
      return true;
    }

    return false;
  },

  updateChannels() {
    const prevSubscribedChannels = this.state.subscribedChannels;
    this.setState({
      currentChannel: this.getParams().roomSlug,
      channels: ChatChannelsStore.getChannels(),
      subscribedChannels: ChatChannelsStore.getSubscribedChannels()
    });
    // Fetch the initial list of messages for all subscribed rooms.
    ChatChannelsStore.getSubscribedChannels().map((channel) => {
      if(!prevSubscribedChannels.contains(channel)){
        ChatActions.getMessages(channel.slug);
      }
    });
  },

  updateUsers() {
    this.setState({
      users: UsersStore.getUsers()
    });
  }
});

module.exports = ChatChannels;
