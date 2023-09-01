import { getSocket } from "@src/utils/socket";

const chatMiddleware = () => (store) => {
  return (next) => (action) => {
    const socket = getSocket();
    switch (action.type) {
      case "chat/joinChannels": {
        const channelIds = action.payload;
        socket.emit("join-channels", channelIds);
        break;
      }
      case "chat/joinRoom": {
        const { channelId, unseenMessageIds } = action.payload;
        socket.emit("join-chatRoom", { channelId, unseenMessageIds });
        break;
      }
      case "chat/sendMessage": {
        const { channelId, senderId, newMessage } = action.payload;
        socket.emit("send-message", {
          channelId,
          senderId,
          newMessage,
        });
        break;
      }
      case "chat/sendImage": {
        const { channelId, senderId, imageData } = action.payload;
        socket.emit("send-image", {
          channelId,
          senderId,
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
