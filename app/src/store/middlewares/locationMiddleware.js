import { getSocket } from "@src/utils/socket";

const locationMiddleware = () => (store) => {
  return (next) => (action) => {
    const socket = getSocket();
    if (socket) {
      switch (action.type) {
        case "location/startTracking": {
          socket.emit("start-tracking");
          break;
        }
        case "location/sendLocation": {
          const { location } = action.payload;
          console.log("location/sendLocation", {
            location: { coords: { ...location.coords } },
          });
          socket.emit("send-location", {
            location: { coords: { ...location.coords } },
          });
          break;
        }
        case "location/stopTracking": {
          socket.emit("stop-tracking");
          break;
        }
      }
    }
    next(action);
  };
};

export default locationMiddleware;
