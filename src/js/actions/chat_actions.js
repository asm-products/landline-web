const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');

class ChatActions {
  submitMessage(message) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHAT_MESSAGE_SUBMITTED,
      message: message
    });
  }
};

module.exports = new ChatActions();
