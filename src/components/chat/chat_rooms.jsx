'use strict';

const AppStore = require('../../stores/app_store');
const ChatActions = require('../../actions/chat_actions');
const ChatRoomMembershipsStore = require('../../stores/chat_room_memberships_store');
const ChatRoomsStore = require('../../stores/chat_rooms_store');
const classnames = require('classnames');
const CurrentUserStore = require('../../stores/current_user_store');
const Icon = require('../ui/icon.jsx');
const { is } = require('immutable');
const Modal = require('../ui/modal.jsx');
const React = require('react/addons');
const Router = require('react-router');
const UnreadChatRoomsStore = require('../../stores/unread_chat_rooms_store');
const UserActions = require('../../actions/user_actions');
const UsersStore = require('../../stores/users_store');

const { Link, State } = Router;

const ONE_HOUR = 60 * 60 * 60 * 1000;

const ChatRooms = React.createClass({
  mixins: [State],
  componentDidMount() {
    ChatRoomsStore.addChangeListener(this.updateRooms);
    ChatRoomMembershipsStore.addChangeListener(this.updateRooms);
    UnreadChatRoomsStore.addChangeListener(this.updateRooms);
    UsersStore.addChangeListener(this.updateUsers);

    let url = __API_URL__;
    let token = CurrentUserStore.getToken();

    this.getRooms();
    UserActions.init(
      `${url}/users?t=1`,
      token
    );
  },

  componentDidUpdate() {
    ChatActions.getPixel(
      `${__API_URL__}/rooms/${this.state.currentRoom}`,
      CurrentUserStore.getToken()
    );
  },

  componentWillUnmount() {
    ChatRoomsStore.removeChangeListener(this.updateRooms);
    ChatRoomMembershipsStore.removeChangeListener(this.updateRooms);
    UsersStore.removeChangeListener(this.updateUsers);
  },

  componentWillReceiveProps(nextProps) {
    let newSlug = this.getParams().roomSlug;
    if (newSlug !== this.state.currentRoom) {
      this.setState({
        currentRoom: newSlug
      });

      ChatActions.markRoomAsRead(ChatRoomsStore.getRoomBySlug(newSlug).id);
    }
  },

  getRooms() {
    let url = __API_URL__;
    let token = CurrentUserStore.getToken();

    ChatActions.getRooms(
      `${url}/rooms?r=1&t=1`,
      token
    );
  },

  getInitialState() {
    return {
      currentRoom: this.getParams().roomSlug,
      rooms: ChatRoomsStore.getRooms(),
      isModalOpen: false,
      subscribedRooms: ChatRoomsStore.getSubscribedRooms(),
      users: UsersStore.getUsers()
    };
  },

  handleJoinRoom(room, e) {
    e.stopPropagation();

    ChatActions.joinRoom(room);
  },

  handleLeaveChannel(room, e) {
    e.stopPropagation();

    ChatActions.leaveRoom(room);
  },

  handleModalDismissed() {
    this.setState({
      isModalOpen: false
    });
  },

  handleSeeAllRooms(e) {
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
        cursor: 'pointer',
        letterSpacing: 1
      }
    };

    return (
      <div className="white" style={style.div}>
        <h5 className="px3 mt2 mb2 light-gray">Rooms</h5>
        {this.renderRooms()}

        <h5 className="px3 mt1 mb1 caps gray">
          <small onClick={this.handleSeeAllRooms} style={style.span}>
            See all
          </small>
        </h5>
        <hr className="mt2 mb0" style={style.hr} />

        <h5 className="px3 mt2 mb2 light-gray">People</h5>
        {this.renderUsers()}
        {this.renderJoinModal()}
        {this.renderModal()}
      </div>
    );
  },

  renderAllRooms() {
    return this.state.rooms.map((room) => {
      let label = room.slug;

      return (
        <div className="clearfix mb2" key={label}>
          <div className="left h5 dark-gray mt1 ml2">
            {label}
          </div>

          <div className="right h5">
            {this.renderJoinOrLeaveButton(room)}
          </div>
        </div>
      );
    }).toJS();
  },

  renderJoinOrLeaveButton(room) {
    let label = room.slug;
    let subscribedRooms = this.state.subscribedRooms;

    if (this.state.subscribedRooms.contains(room)) {
      return (
        <button className="button-outline blue"
            onClick={this.handleLeaveChannel.bind(this, label)}>
          Leave
        </button>
      );
    }

    return (
      <button className="button"
          onClick={this.handleJoinRoom.bind(this, label)}>
        Join
      </button>
    );
  },

  renderJoinModal() {
    let currentRoom = this.state.currentRoom;
    let condition = (value, key, iterable) => {
      return value.slug === currentRoom
    };

    return (
      <div className="dark-gray">
        <Modal header={`Join ${currentRoom}?`}
            isOpen={!this.state.subscribedRooms.find(condition) && !this.state.isModalOpen}
            onDismiss={this.handleJoinRoom.bind(this, currentRoom)}
            theme="dark-gray">
          {this.renderNotSubscribedWarning()}
        </Modal>
      </div>
    );
  },

  renderModal() {
    let style = {
      maxHeight: 300,
      overflowY: 'scroll'
    };
    return (
      <div className="dark-gray" style={style}>
        <Modal header="Rooms"
            isOpen={this.state.isModalOpen}
            onDismiss={this.handleModalDismissed}
            theme="dark-gray">
          {this.renderAllRooms()}
        </Modal>
      </div>
    );
  },

  renderNotSubscribedWarning() {
    let currentRoom = this.state.currentRoom;
    return (
      <div className="clearfix mb2 center">
        You&#39;re about to join <span className="bold">#{currentRoom}</span>.
        <div>
          <button className="button"
              onClick={this.handleJoinRoom.bind(this, currentRoom)}>
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
    let unreadRooms = this.state.unreadRooms;
    return this.state.subscribedRooms.map((room) => {
      let label = room.slug;
      let classes = classnames({
        block: true,
        bold: unreadRooms && unreadRooms.contains(room.id),
        h5: true,
        px3: true,
        white: true
      });

      return (
        <Link to="chat"
            params={{roomSlug: label}}
            key={label}
            className={classes}>
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
    if (nextState.currentRoom !== this.state.currentRoom) {
      ChatActions.getPixel(
        `${__API_URL__}/rooms/${this.state.currentRoom}`,
        CurrentUserStore.getToken()
      );
      return true;
    }

    if (!is(nextState.rooms, this.state.rooms)) {
      return true;
    }

    if (!is(nextState.subscribedRooms, this.state.subscribedRooms)) {
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

  updateRooms() {
    const prevSubscribedRooms = this.state.subscribedRooms;
    this.setState({
      currentRoom: this.getParams().roomSlug,
      rooms: ChatRoomsStore.getRooms(),
      subscribedRooms: ChatRoomsStore.getSubscribedRooms(),
      unreadRooms: UnreadChatRoomsStore.getUnreadRooms()
    });

    // Fetch the initial list of messages for all subscribed rooms.
    ChatRoomsStore.getSubscribedRooms().map((room) => {
      if (!prevSubscribedRooms.contains(room)) {
        ChatActions.getMessages(room.slug);
      }
    });
  },

  updateUsers() {
    this.setState({
      users: UsersStore.getUsers()
    });
  }
});

module.exports = ChatRooms;
