'use strict';

jest.dontMock('../chat_channels.jsx');

const { List, Map } = require('immutable');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

describe('ChatChannels', () => {
  let channels, ChatChannels, chatChannels, ChatChannelsStore, users, UsersStore;

  beforeEach(() => {
    channels = List([
      Map({ label: 'test', url: '/test' })
    ]);
    users = Map({
      user: Map({
        username: 'Larry'
      })
    });
    ChatChannelsStore = require('../../../stores/chat_channels_store');
    ChatChannelsStore.getChannels.mockReturnValue(channels);
    ChatChannels = require('../chat_channels.jsx');
    UsersStore = require('../../../stores/users_store');
    UsersStore.getUsers.mockReturnValue(users);
    chatChannels = TestUtils.renderIntoDocument(<ChatChannels />);
  });

  describe('componentDidMount()', () => {
    it('adds a listener to ChatChannelsStore', () => {
      expect(ChatChannelsStore.addChangeListener).
        toBeCalledWith(chatChannels.updateChannels);
    });
  });

  describe('componentWillUnmount()', () => {
    it('removes a listener from ChatChannelsStore', () => {
      chatChannels.componentWillUnmount();

      expect(ChatChannelsStore.removeChangeListener).
        toBeCalledWith(chatChannels.updateChannels);
    });
  });

  describe('renderChannels()', () => {
    it('iterates through the channels and returns an array of links', () => {
      let renderedChannels = chatChannels.renderChannels();
      expect(renderedChannels.length).toEqual(1);
      expect(TestUtils.isElement(renderedChannels[0])).toBe(true);
    });
  });

  describe('updateChannels()', () => {
    it('sets the state with channels', () => {
      chatChannels.updateChannels();

      expect(chatChannels.state.channels.size).toEqual(1);
    });
  });
});
