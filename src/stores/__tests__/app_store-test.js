'use strict';

jest.dontMock('../app_store');
jest.dontMock('react/lib/keyMirror');

const React = require('react/addons');

describe('AppStore', () => {
  let ActionTypes, AppStore, callback, Dispatcher;

  beforeEach(() => {
    ActionTypes = require('../../constants').ActionTypes;
    Dispatcher = require('../../dispatcher');
    AppStore = require('../app_store');
    callback = Dispatcher.register.mock.calls[0][0];
  });

  describe('ROUTE_CHANGED', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.ROUTE_CHANGED,
        component: <div />,
        context: {
          foo: 'bar'
        }
      });
    });

    it('sets the component', () => {
      expect(AppStore.getComponent()).toEqual(<div />);
    });

    it('sets the context', () => {
      expect(AppStore.getContext()).toEqual({
        foo: 'bar'
      });
    });

    it('emits a change event', () => {
      expect(AppStore.emitChange).toBeCalled();
    });
  });

  describe('!ROUTE_CHANGED', () => {
    beforeEach(() => {
      callback({
        actionType: ActionTypes.FOO,
        component: <div />,
        context: {
          foo: 'bar'
        }
      });
    });

    it('does not emit a change event', () => {
      expect(AppStore.emitChange).not.toBeCalled();
    });
  });
});
