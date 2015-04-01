'use strict';

// https://github.com/jxnblk/rebass/blob/master/src/modal.jsx
const React = require('react');
const ThemeMixin = require('../../mixins/theme_mixin');

module.exports = React.createClass({
  mixins: [ThemeMixin],

  propTypes: {
    flush: React.PropTypes.bool,
    fullBlead: React.PropTypes.bool,
    header: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onDismiss: React.PropTypes.func,
    theme: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      isOpen: false,
      flush: false,
      fullBleed: false,
      size: 'medium',
      header: null,
      theme: 'white',
      onDismiss: () => {}
    };
  },

  render() {
    let isOpen = this.props.isOpen;
    let header = this.props.header;
    let classes = this.getThemeClasses() || {};
    classes.body = this.props.flush ? '' : 'p2';
    classes.header = 'flex flex-center ' + classes.main + (classes.border ? ' border-bottom' : '');
    classes.container = 'flex flex-center overflow-auto bg-darken-3 ' + (this.props.fullBleed ? '' : 'p2');
    let width = 640;
    if (this.props.size == 'big') { width = 960 }
    else if (this.props.size == 'small') { width = 320 }

    let styles = {
      container: {
        display: isOpen ? '' : 'none',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 4,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      modal: {
        position: 'relative',
        width: this.props.fullBleed ? 'auto' : width,
        maxWidth: '100%',
        margin: 'auto',
        overflow: 'hidden',
        boxShadow: '0 4px 4px rgba(0,0,0,.1)',
      },
      dismissButton: this.buttonStyle,
    };

    if (this.props.fullBleed) {
      styles.modal.position = 'absolute';
      styles.modal.top = 0;
      styles.modal.right = 0;
      styles.modal.bottom = 0;
      styles.modal.left = 0;
      styles.modal.margin = 0;
    }

    return (
      <div className={classes.container}
        style={styles.container}>
        <span style={styles.overlay}
          onClick={this.props.onDismiss} />
        <div className="bg-white rounded"
          style={styles.modal}>
          <div className={classes.header}>
            <div className="bold p2 flex-auto">{header}</div>
            <button className="h3"
              style={styles.dismissButton}
              onClick={this.props.onDismiss}
              title="Dismiss modal overlay">
              &times;
            </button>
          </div>
          <div className={classes.body} style={{maxHeight: 300, overflowY: 'scroll'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
