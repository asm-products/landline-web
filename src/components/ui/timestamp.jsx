'use strict';

const React = require('react');

const Timestamp = React.createClass({
  propTypes: {
    time: React.PropTypes.object
  },

  render() {
    let style = {
      backgroundColor: 'white',
      border: '1.5px solid #ededed',
      borderRadius: 24,
      display: 'inline-block',
      fontSize: 11,
      marginTop: 12,
      marginBottom: 12,
      padding: '2px 10px',
      position: 'relative'
    };
    let { time } = this.props;

    return (
      <time className="gray" style={style} dateTime={time.format()}>
        about {time.fromNow()}
      </time>
    );
  }
});

module.exports = Timestamp;
