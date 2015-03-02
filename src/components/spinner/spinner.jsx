'use strict';

const UserActions = require('../../actions/user_actions');
const React = require('react/addons');

if (typeof __TEST__ === 'undefined') {
  require('../../styles/spinner.css');
}

const Spinner = React.createClass({
  render() {
    let style = {
      margin: 'auto',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '50%',
      height: 200,
    };

    return (
      <div className="bg-white center" style={style}>
        <div className="spinner-rects">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
    );
  }
});

module.exports = Spinner;
