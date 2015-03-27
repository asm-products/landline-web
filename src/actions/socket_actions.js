const sio = require('socket.io-client');
const ActionTypes = require('../constants').ActionTypes;
const PayloadSources = require('../constants').PayloadSources;
const Dispatcher = require('../dispatcher');
const SocketStore = require('../stores/socket_store');

class SocketActions{
  init(url) {
    let socket = sio(url);
    socket.on('connect', this.onConnected);

    Dispatcher.dispatch({
      actionType: ActionTypes.SOCKET_INITIALIZED,
      socket: socket
    });
  }

  onConnected() {
    Dispatcher.dispatch({
      actionType: ActionTypes.SOCKET_CONNECTED
    });
  }

  auth(token) {
    SocketStore.getSocket().emit('auth', token, (response) => {
      if (response.Success) {
        Dispatcher.dispatch({
          actionType: ActionTypes.SOCKET_AUTHENTICATED
        });
      } else {
        Dispatcher.dispatch({
          actionType: ActionTypes.SOCKET_AUTHENTICATION_FAILED
        });
      }
    });
  }
}

module.exports = new SocketActions();
