import { io } from "socket.io-client";
import { UrlAPI } from "../constants";
const socket = io(UrlAPI, { transports: ["websocket"] });

socket.on("connect", () => {
  console.log("Socket connected");
});
socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
export default socket;
