import { io } from "socket.io-client";

const socket = io("http://192.168.115.104:3000", { transports: ["websocket"] });

export default socket;
