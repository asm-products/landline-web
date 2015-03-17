'use strict';

const AppStore = require('../../stores/app_store');
const autosize = require('autosize/src/autosize');
const ChatActions = require('../../actions/chat_actions');
const CurrentUserStore = require('../../stores/current_user_store');
const DropzoneMixin = require('../../mixins/dropzone_mixin');
const { Map } = require('immutable');
const React = require('react/addons');
const Router = require('react-router');
const Typeahead = require('../typeahead/typeahead.jsx');
const TypeaheadStore = require('../../stores/typeahead_store');

const ENTER_KEY = 13;
const USERNAME_REGEX = /(^|\s)@(\w+)$/;

const ChatInput = React.createClass({
  mixins: [DropzoneMixin, Router.State],

  propTypes: {
    commentId: React.PropTypes.string
  },

  componentDidMount() {
    autosize(this.refs.textarea.getDOMNode());
    TypeaheadStore.addChangeListener(this.replaceQueryWithUsername);
  },

  componentWillUnmount() {
    TypeaheadStore.removeChangeListener(this.replaceQueryWithUsername);
  },

  componentWillReceiveProps() {
    this.setState({
      channel: this.getParams().roomSlug
    });
  },

  getDefaultProps() {
    return {
      commentId: 'new-comment'
    };
  },

  getInitialState() {
    return {
      body: '',
      channel: this.getParams().roomSlug,
      partialUsername: null,
      user: CurrentUserStore.getUser()
    };
  },

  handleChange(e) {
    let partialUsername = null;
    let matches = e.target.value.match(USERNAME_REGEX);

    if (matches) {
      partialUsername = matches.slice(-1)[0] || '';
    }

    this.setState({
      body: e.target.value,
      partialUsername: partialUsername
    });
  },

  render() {
    let {
      body,
      user
    } = this.state;

    let style = {
      div: {
        boxShadow: '-4px 0 15px rgba(0,0,0,.15)'
      },
      textarea: {
        lineHeight: '1.1rem',
        overflow: "hidden",
        resize: "none",
        wordWrap: "break-word"
      }
    };

    if (user.get('Username') || user.get('username')) {
      return (
        <div className="full-width shadow px3 py1" style={style.div}>
          <Typeahead partialUsername={this.state.partialUsername}>
            <textarea autofocus={true}
                className="full-width field-light mb2 dropzone"
                style={style.textarea}
                onKeyPress={this.submitMessage}
                onChange={this.handleChange}
                ref="textarea"
                value={body}
                placeholder="What do you want to say?" />
          </Typeahead>
        </div>
      );
    }

    return null;
  },

  replaceQueryWithUsername() {
    let username = TypeaheadStore.getCurrentUsername();
    let body = this.state.body;

    this.setState({
      body: body.replace(USERNAME_REGEX, (match, space) => {
        return space + '@' + username;
      }),
      partialUsername: null
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.body !== this.state.body;
  },

  submitMessage(e) {
    if (e.which === ENTER_KEY) {
      e.preventDefault();

      let body = this.state.body;

      this.setState({
        body: ''
      });

      ChatActions.submitMessage(this.state.channel, body);
    }
  }
});

module.exports = ChatInput;
