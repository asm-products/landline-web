Dispatcher.dispatch({
  actionType: ActionTypes.CHAT_CHANNEL_RECEIVED,
  channel: data.room.slug
});

Dispatcher.dispatch({
  actionType: ActionTypes.CHAT_PIXEL_RECEIVED,
  pixel: data.pixel
});
