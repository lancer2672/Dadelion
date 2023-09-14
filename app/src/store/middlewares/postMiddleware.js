import { getSocket } from "@src/utils/socket";

const postMiddleware = () => (store) => {
  return (next) => (action) => {
    const socket = getSocket();
    switch (action.type) {
      case "post/reactPost": {
        const { postCreatorId, postId } = action.payload;
        socket.emit("react-post", { postCreatorId, postId });
        break;
      }
      case "post/commentPost": {
        // const { postCreatorId, postId } = action.payload;
        // socket.emit("upload-comment", { postCreatorId, postId });
        break;
      }
    }
    next(action);
  };
};

export default postMiddleware;
