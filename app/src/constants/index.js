const UrlAPI = "http://172.22.48.1:3000";
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

const UrlType = {
  MESSAGE: "message",
  POST: "post",
  USER: "user",
};
export { NotificationType, MessageType, UrlType, UrlAPI };
