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
      case "chat/joinChannel": {
        const { userBId, channelId } = action.payload;
        socket.emit("join-channel", { userBId, channelId });
        break;
      }
      case "chat/typing": {
        const { channelId, chatFriendId, isTyping } = action.payload;
        socket.emit("typing", { channelId, chatFriendId, isTyping });
        break;
      }
      case "chat/joinRoom": {
        const { channelId } = action.payload;
        socket.emit("join-chatRoom", { channelId });
        break;
      }
      case "chat/sendMessage": {
        socket.emit("send-message", action.payload);
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
      case "chat/unfriend": {
        const { friendId } = action.payload;
        socket.emit("unfriend", { friendId });
        break;
      }
      case "user/logout/fulfilled": {
        socket.disconnect();
        break;
      }
    }
    next(action);
  };
};

export default chatMiddleware;
