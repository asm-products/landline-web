'use strict';

jest.dontMock('../chat_rooms.jsx');

const { List, Map } = require('immutable');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('ChatRooms', () => {
  let ChatRooms,
    chatRooms,
    ChatRoomsStore,
    el,
    rooms,
    UnreadChatRoomsStore,
    unreadRooms,
    users,
    UsersStore;

  beforeEach(() => {
    let getCurrentParams = () => {
      return {};
    };
    rooms = List([
      { label: 'test', url: '/test' }
    ]);
    unreadRooms = List(['id']);
    users = Map({
      user: {
        username: 'Larry'
      }
    });
    el = document.createElement('div');
    ChatRoomsStore = require('../../../stores/chat_rooms_store');
    UnreadChatRoomsStore = require('../../../stores/unread_chat_rooms_store');
    ChatRoomsStore.getRooms.mockReturnValue(rooms);
    ChatRoomsStore.getSubscribedRooms.mockReturnValue(rooms);
    UnreadChatRoomsStore.getUnreadRooms.mockReturnValue(unreadRooms);
    ChatRooms = require('../chat_rooms.jsx');
    UsersStore = require('../../../stores/users_store');
    UsersStore.getUsers.mockReturnValue(users);
    StubbedRooms = stubRouterContext(ChatRooms, {}, { getCurrentParams: getCurrentParams });
    chatRooms = React.render(<StubbedRooms />, el);
  });

  describe('componentDidMount()', () => {
    it('adds a listener to ChatRoomsStore', () => {
      expect(ChatRoomsStore.addChangeListener).
        toBeCalledWith(chatRooms.updateRooms);
    });
  });

  describe('componentWillUnmount()', () => {
    it('removes a listener from ChatRoomsStore', () => {
      React.unmountComponentAtNode(el);

      expect(ChatRoomsStore.removeChangeListener).
        toBeCalledWith(chatRooms.updateRooms);
    });
  });

  describe('renderChannels()', () => {
    it('iterates through the rooms and returns an array of links', () => {
      let renderedChannels = TestUtils.scryRenderedDOMComponentsWithClass(
        chatRooms,
        'bg-highlight block h5 px3 white'
      );
      expect(renderedChannels.length).toEqual(1);
      expect(renderedChannels[0].tagName).toEqual('A');
    });
  });
});
