'use strict';

const React = require('react/addons');
const UserPickerEntry = require('./user_picker_entry.jsx');

const UserPicker = React.createClass({
  propTypes: {
    highlightIndex: React.PropTypes.number.isRequired,
    users: React.PropTypes.object.isRequired
  },

  componentWillUpdate() {
    this.updatePositionRelativeToHeight();
  },

  getDefaultProps() {
    return {
      offset: [0, -50]
    };
  },

  getInitialState() {
    return {
      top: -50
    };
  },

  render() {
    let offset = this.props.offset;

    let style = {
      boxShadow: '2px 2px 8px rgba(0,0,0,.15)',
      position: 'absolute',
      zIndex: 100,
      display: 'block',
      left: offset[0],
      maxHeight: 200,
      overflow: 'scroll',
      top: this.state.top
    };

    return (
      <div className="absolute mt1 mb0 nowrap bg-white rounded animation-fadein" style={style}>
        <ul className="list-reset mb0">
          {this.renderRows()}
        </ul>
      </div>
    );
  },

  renderRows() {
    let highlightIndex = this.props.highlightIndex;
    let users = this.props.users.toJS().map((user, i) => {
      return <UserPickerEntry key={user.id} user={user} selected={i === highlightIndex} />;
    });

    return users;
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.users.size !== this.props.users.size ||
      nextProps.highlightIndex !== this.props.highlightIndex;
  },

  updatePositionRelativeToHeight() {
    let node = this.getDOMNode();

    this.setState({
      top: -node.offsetHeight + (this.props.offset[1])
    });
  }
});

module.exports = UserPicker;
