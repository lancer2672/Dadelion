const UrlAPI = "http://10.0.28.36:3000";
// export const UrlAPI = "https://dandelion-server.onrender.com";

const MessageType = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  CALL: "callHistory",
};
const NotificationType = {
  CHAT: "chat",
  POST: "post",
  FRIEND_REQUEST: "friend-request",
};

export { NotificationType, MessageType, UrlAPI };
