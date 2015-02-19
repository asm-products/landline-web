'use strict';

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

jest.dontMock('../app.jsx');
jest.dontMock('react/lib/keyMirror');

describe('App', () => {
  let App,
    app,
    AppActions,
    AppStore;

  beforeEach(() => {
    AppStore = require('../stores/app_store');
    App = require('../app.jsx');
    app = TestUtils.renderIntoDocument(<App />);
    AppActions = require('../actions/app_actions');
  });

  describe('componentDidMount()', () => {
    it('adds a listener to AppStore', () => {
      expect(AppStore.addChangeListener).
        toBeCalledWith(app.getComponentAndContext);
    });

    it('initializes AppActions', () => {
      expect(AppActions.start).toBeCalled();
    });
  });

  describe('componentWillUnmount()', () => {
    it('removes a listener from AppStore', () => {
      app.componentWillUnmount();

      expect(AppStore.removeChangeListener).
        toBeCalledWith(app.getComponentAndContext);
    });

    it('stops AppActions', () => {
      app.componentWillUnmount();

      expect(AppActions.stop).toBeCalled();
    });
  });

  describe('getComponentAndContext()', () => {
    beforeEach(() => {
      AppStore.getComponent.mockReturnValueOnce(<div />);
      AppStore.getContext.mockReturnValueOnce({});
      app.replaceState = jest.genMockFn();
    });

    afterEach(() => {
      AppStore.getComponent.mockClear();
      AppStore.getContext.mockClear();
    });

    it('gets the component from AppStore', () => {
      app.getComponentAndContext();

      expect(AppStore.getComponent).toBeCalled();
    });

    it('gets the context from AppStore', () => {
      app.getComponentAndContext();

      expect(AppStore.getContext).toBeCalled();
    });

    it('replaces its own state', () => {
      app.getComponentAndContext();

      expect(app.replaceState).toBeCalled();
    });
  });

  describe('getInitialState()', () => {
    it('returns a bare div', () => {
      expect(app.getInitialState()).toEqual({
        component: <div />
      });
    });
  });

  describe('render()', () => {
    it('returns the component', () => {
      expect(app.render()).toEqual(<div />);
    });
  });
});
