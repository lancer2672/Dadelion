import { getSocket } from "@src/utils/socket";

const notificationMiddleware = () => (store) => {
  return (next) => (action) => {
    const socket = getSocket();
    switch (action.type) {
      case "notification/markSeenNotifications": {
        const { friendRequestIds, notificationIds } = action.payload;
        socket.emit("mark-seen-notifications", {
          friendRequestIds,
          notificationIds,
        });
        break;
      }
    }
    next(action);
  };
};

export default notificationMiddleware;
