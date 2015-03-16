var React = require('react/addons');
var assign = require('object-assign');

global.__API_URL__ = 'http://localhost';
global.__TEST__ = true;

// https://github.com/rackt/react-router/blob/master/docs/guides/testing.md
global.stubRouterContext = (Component, props, stubs) => {
  var func = () => {
    return {};
  };

  return React.createClass({
    childContextTypes: {
      makePath: func,
      makeHref: func,
      transitionTo: func,
      replaceWith: func,
      goBack: func,
      getCurrentPath: func,
      getCurrentRoutes: func,
      getCurrentPathname: func,
      getCurrentParams: func,
      getCurrentQuery: func,
      isActive: func,
    },

    getChildContext () {
      return assign({
        makePath() {},
        makeHref() {},
        transitionTo() {},
        replaceWith() {},
        goBack() {},
        getCurrentPath() {},
        getCurrentRoutes() {},
        getCurrentPathname() {},
        getCurrentParams() {},
        getCurrentQuery() {},
        isActive() {},
      }, stubs);
    },

    render () {
      return <Component {...props} />
    }
  });
};
