const sio = require('socket.io-client');
const ActionTypes = require('../constants').ActionTypes;
const PayloadSources = require('../constants').PayloadSources;
const Dispatcher = require('../dispatcher');
const SocketStore = require('../stores/socket_store');

class SocketActions{
  init(url){
    var socket = sio(url);
    socket.on("connect", this.onConnected);

    Dispatcher.dispatch({
      actionType: ActionTypes.SOCKET_INITIALIZED,
      socket: socket
    });
  }

  onConnected(){
    Dispatcher.dispatch({
      actionType: ActionTypes.SOCKET_CONNECTED
    });
  }

  auth(token){
    var socket = SocketStore.getSocket()
    socket.emit('auth', token, function(response){
      if(response.Success){
        Dispatcher.dispatch({
          actionType: ActionTypes.SOCKET_AUTHENTICATED
        });
      }else{
        Dispatcher.dispatch({
          actionType: ActionTypes.SOCKET_AUTHENTICATION_FAILED
        });
      }
    });
  }
}

module.exports = new SocketActions();
