'use strict';

const Avatar = require('../ui/avatar.jsx');
const classnames = require('classnames');
const React = require('react/addons');
const TypeaheadActions = require('../../actions/typeahead_actions');

const UserPickerEntry = React.createClass({
  propTypes: {
    selected: React.PropTypes.bool,
    user: React.PropTypes.shape({
      avatar_url: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    let style = {};
    if (this.props.selected) {
      style.backgroundColor = '#E0EEF9';
    }

    let user = this.props.user;

    return (
      <li style={style}>
        <span className="block clearfix py1 px2 black clickable"
            href="javascript:void(0);"
            onClick={this.handleUserSelected}>
          <div className="left mr2">
            <Avatar url={user.avatar_url} />
          </div>
          <div className="overflow-hidden">
            @{user.username}
          </div>
        </span>
      </li>
    );
  },

  handleUserSelected(e) {
    e.stopPropagation();

    TypeaheadActions.selectUser(this.props.user.username);
  }
});

module.exports = UserPickerEntry;
