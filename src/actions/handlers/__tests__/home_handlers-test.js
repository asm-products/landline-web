'use strict';

jest.dontMock('../home_handlers');
jest.dontMock('react/lib/keyMirror');

describe('HomeHandlers', () => {
  describe('showHome()', () => {
    let ActionTypes, Dispatcher, Err, Home, HomeHandlers;

    beforeEach(() => {
      ActionTypes = require('../../../constants').ActionTypes;
      Dispatcher = require('../../../dispatcher');
      Err = require('../../../components/errors/error.jsx');
      Home = require('../../../components/home/home.jsx');
      HomeHandlers = require('../home_handlers');
    });

    it('dispatches <Home /> if there is not an error', () => {
      HomeHandlers.showHome(null, {}, {});

      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType: ActionTypes.ROUTE_CHANGED,
        component: Home,
        context: {}
      });
    });

    it('dispatches <Error /> if there is an error', () => {
      HomeHandlers.showHome(new Error(), {}, {});

      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType: ActionTypes.ROUTE_CHANGED,
        component: Err,
        context: {}
      });
    });
  });
});
