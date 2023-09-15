import { getSocket } from "@src/utils/socket";
import { updateSelectedPost } from "../slices/postSlice";

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
        const { commentUserId, postCreatorId, postId, content } =
          action.payload;

        socket.emit("upload-comment", {
          commentUserId,
          postCreatorId,
          postId,
          content,
        });

        break;
      }
    }
    next(action);
  };
};

export default postMiddleware;
