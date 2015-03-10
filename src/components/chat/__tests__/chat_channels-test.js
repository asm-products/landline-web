'use strict';

jest.dontMock('../chat_channels.jsx');

const { List, Map } = require('immutable');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('ChatChannels', () => {
  let channels, ChatChannels, chatChannels, ChatChannelsStore, el, users, UsersStore;

  beforeEach(() => {
    let getCurrentParams = () => {
      return {};
    };
    channels = List([
      { label: 'test', url: '/test' }
    ]);
    users = Map({
      user: {
        username: 'Larry'
      }
    });
    el = document.createElement('div');
    ChatChannelsStore = require('../../../stores/chat_channels_store');
    ChatChannelsStore.getChannels.mockReturnValue(channels);
    ChatChannels = require('../chat_channels.jsx');
    UsersStore = require('../../../stores/users_store');
    UsersStore.getUsers.mockReturnValue(users);
    StubbedChannels = stubRouterContext(ChatChannels, {}, { getCurrentParams: getCurrentParams });
    chatChannels = React.render(<StubbedChannels />, el);
  });

  describe('componentDidMount()', () => {
    it('adds a listener to ChatChannelsStore', () => {
      expect(ChatChannelsStore.addChangeListener).
        toBeCalledWith(chatChannels.updateChannels);
    });
  });

  describe('componentWillUnmount()', () => {
    it('removes a listener from ChatChannelsStore', () => {
      React.unmountComponentAtNode(el);

      expect(ChatChannelsStore.removeChangeListener).
        toBeCalledWith(chatChannels.updateChannels);
    });
  });

  describe('renderChannels()', () => {
    it('iterates through the channels and returns an array of links', () => {
      let renderedChannels = TestUtils.scryRenderedDOMComponentsWithClass(
        chatChannels,
        'block white px3 h5 light-gray'
      );
      expect(renderedChannels.length).toEqual(1);
      expect(renderedChannels[0].tagName).toEqual('A');
    });
  });
});
