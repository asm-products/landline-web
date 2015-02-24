'use strict';

const Dispatcher = require('../dispatcher');
const Firebase = require('firebase');

class PersistenceUtils {
  constructor(ref, actionType, key) {
    this.base = new Firebase(FIREBASE_URL);
    this.ref = this.base.child(ref);
    this.actionType = actionType;
    this.key = key;
  }

  init() {
    this.ref.on('child_added', (snapshot) => {
      let obj = snapshot.val();
      let action = {
        actionType: this.actionType
      };

      action[this.key] = obj;

      Dispatcher.dispatch(action);
    });
  }

  push(obj) {
    this.ref.push(obj);
  }

  query() {
    return this.ref;
  }
};

module.exports = PersistenceUtils;
