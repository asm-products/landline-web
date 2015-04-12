'use strict';

const React = require('react');

const ONE_MINUTE = 60 * 1000;

const Timestamp = React.createClass({
  propTypes: {
    time: React.PropTypes.shape({
      format: React.PropTypes.func.isRequired,
      fromNow: React.PropTypes.func.isRequired
    }).isRequired
  },

  componentDidMount() {
    let { time } = this.props;

    this.timeRefreshInterval = window.setInterval(() => {
      this.setState({
        format: time.format(),
        fromNow: time.fromNow()
      });
    }, ONE_MINUTE);
  },

  componentWillUnmount() {
    window.clearInterval(this.timeRefreshInterval);
  },

  getInitialState() {
    let { time } = this.props;

    return {
      format: time.format(),
      fromNow: time.fromNow()
    };
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
    let {
      format,
      fromNow
    } = this.state;

    return (
      <time className="gray" style={style} dateTime={format}>
        about {fromNow}
      </time>
    );
  }
});

module.exports = Timestamp;
