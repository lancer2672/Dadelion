import { chatApi } from "../slices/api/chatApiSlice";

const socketMiddleware = (socket) => (store) => {
  return (next) => (action) => {
    if (action.type == "chat/joinRoom") {
      const channelId = action.payload;
      socket.emit("join-chat-room", channelId);
    }
    if (action.type == "chat/sendMessage") {
      // I want to trigger cache data of loadRoomMessage
      const { channelId, userId, newMessage } = action.payload;
      socket.emit("send-message", {
        channelId,
        userId,
        newMessage,
      });
    }
    next(action);
  };
};

export default socketMiddleware;
