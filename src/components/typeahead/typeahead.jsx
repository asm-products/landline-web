'use strict';

const React = require('react/addons');
const { Set } = require('immutable');
const TypeaheadActions = require('../../actions/typeahead_actions');
const UserPicker = require('./user_picker.jsx');
const UsersStore = require('../../stores/users_store');

const KEYS = {
  enter: 13,
  esc: 27,
  tab: 9,
  up: 38,
  down: 40
};

const Typeahead = React.createClass({
  propTypes: {
    partialUsername: React.PropTypes.string
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.partialUsername !== this.props.partialUsername) {
      this.setState({
        users: UsersStore.filterUsersByPartialUsername(nextProps.partialUsername)
      });
    }
  },

  constrainHighlight(index, length) {
    return Math.max(
      0, Math.min(length - 1, index)
    );
  },

  getInitialState() {
    return {
      highlightIndex: 0,
      users: Set()
    };
  },

  handleKeyDown(e) {
    if (!this.shouldShowUserPicker()) {
      return
    }

    var charCode = e.charCode || e.keyCode || e.which;

    if (charCode == KEYS.up) {
      e.preventDefault();
      this.moveHighlight(-1);
    } else if (charCode == KEYS.down) {
      e.preventDefault();
      this.moveHighlight(1);
    } else if (charCode == KEYS.enter || charCode == KEYS.tab) {
      e.preventDefault();
      this.selectCurrentUser();
    } else if (charCode == KEYS.esc) {
      e.preventDefault();
      TypeaheadActions.selectUser(null);
    }
  },

  moveHighlight: function(inc) {
    this.setState({
      highlightIndex: this.constrainHighlight(
        this.state.highlightIndex + inc,
        this.state.users.size
      )
    });
  },

  render() {
    let style = {
      position: 'relative'
    };

    return (
      <div style={style} onKeyDown={this.handleKeyDown}>
        {this.renderUserPicker()}
        {this.props.children}
      </div>
    );
  },

  renderUserPicker() {
    if (this.shouldShowUserPicker()) {
      return <UserPicker users={this.state.users}
          highlightIndex={this.state.highlightIndex} />
    }
  },

  selectCurrentUser() {
    TypeaheadActions.selectUser(
      this.state.users.toJS()[this.state.highlightIndex].username
    );
  },

  shouldShowUserPicker() {
    return !!this.props.partialUsername;
  }
});

module.exports = Typeahead;
