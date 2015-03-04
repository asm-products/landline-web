'use strict';

if (typeof __TEST__ === 'undefined') {
  require('font-awesome/css/font-awesome.min.css');
}

const classnames = require('classnames');
const React = require('react/addons');

// see https://fortawesome.github.io/Font-Awesome/examples/

const Icon = React.createClass({
  propTypes: {
    options: React.PropTypes.oneOf([
      React.PropTypes.arrayOf(React.PropTypes.string),
      React.PropTypes.string
    ]),
    icon: React.PropTypes.string.isRequired
  },

  render() {
    let icon = this.props.icon;
    let options = this.props.options || [];

    if (options.split) {
      options = options.split(' ');
    }

    options = options.map(c => `fa-${c}`);

    let classes = classnames.
      apply(null, [(icon === 'stack' ? '' : 'fa'), `fa-${this.props.icon}`].
      concat(options));

    return (
      <span className={classes}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Icon;
