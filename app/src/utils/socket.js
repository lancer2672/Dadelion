import { io } from "socket.io-client";
import { UrlAPI } from "../constants";

let socket = null;
export const initSocket = (userId) => {
  socket = io(UrlAPI, { transports: ["websocket"], query: { userId } });

  socket.on("connect", () => {
    console.log("Socket connected");
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
};
export const getSocket = () => {
  return socket;
};
