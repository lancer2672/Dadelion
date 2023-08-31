import { getSocket } from "@src/utils/socket";

const chatMiddleware = () => (store) => {
  return (next) => (action) => {
    const socket = getSocket();
    switch (action.type) {
      case "chat/joinRoom": {
        const channelId = action.payload;
        socket.emit("join-chatRoom", channelId);
        break;
      }
      case "chat/sendMessage": {
        const { channelId, userId, newMessage } = action.payload;
        socket.emit("send-message", {
          channelId,
          userId,
          newMessage,
        });
        break;
      }
      case "chat/sendImage": {
        const { channelId, userId, imageData } = action.payload;
        socket.emit("send-image", {
          channelId,
          userId,
          imageData,
        });
        break;
      }
      case "chat/sendFriendRequest": {
        const { receiverId, senderId } = action.payload;
        socket.emit("send-friendRequest", {
          senderId,
          receiverId,
        });
        break;
      }
      case "chat/responseFriendRequest": {
        const { requestId, responseValue } = action.payload;
        socket.emit("response-friendRequest", {
          requestId,
          responseValue,
        });
        break;
      }
    }
    next(action);
  };
};

export default chatMiddleware;
