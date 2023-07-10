import { io } from "socket.io-client";
import { UrlAPI } from "../constants";
const socket = io(UrlAPI, { transports: ["websocket"] });

export default socket;
