'use strict';

module.exports = {
  retrieveToken() {
    let token = localStorage.getItem('ll_token');
    let expiration = localStorage.getItem('ll_expiration');

    return (Date.now() / 1000) < expiration ? token : null;
  },

  setTokenAndExpiration(token, expiration) {
    localStorage.setItem('ll_token', token);
    localStorage.setItem('ll_expiration', expiration);
  }
};
