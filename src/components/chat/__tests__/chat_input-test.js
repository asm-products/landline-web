'use strict';

jest.dontMock('../chat_input.jsx');

const { Map } = require('immutable');
let React;
let TestUtils;

describe('ChatInput', () => {
  let ChatActions, ChatInput, chatInput, CurrentUserStore, currentUser, TypeaheadStore;

  beforeEach(() => {
    let getCurrentParams = () => {
      return {};
    };

    React = require('react/addons');
    TestUtils = React.addons.TestUtils;

    currentUser = Map({
      username: 'foo'
    });
    ChatActions = require('../../../actions/chat_actions');
    ChatInput = require('../chat_input.jsx');
    CurrentUserStore = require('../../../stores/current_user_store');
    CurrentUserStore.getUser.mockReturnValue(currentUser);
    TypeaheadStore = require('../../../stores/typeahead_store');
    StubbedInput = stubRouterContext(ChatInput, {}, { getCurrentParams: getCurrentParams });
    chatInput = React.render(<StubbedInput />, document.createElement('div'));
  });

  describe('componentDidMount()', () => {
    it('listens to the TypeaheadStore', () => {
      expect(TypeaheadStore.addChangeListener).toBeCalled();
    });
  });

  describe('render()', () => {
    let Typeahead, t;

    beforeEach(() => {
      Typeahead = require('../../typeahead/typeahead.jsx');
      t = TestUtils.findRenderedComponentWithType(chatInput, Typeahead);
    });

    it('renders a Typeahead component', () => {
      expect(t).toBeDefined();
    });

    it('passes a textarea as child to Typeahead', () => {
      expect(t.props.children.type).toEqual('textarea');
    });
  });
});
