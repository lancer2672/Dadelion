import { createSlice } from "@reduxjs/toolkit";
import { getSocket } from "@src/utils/socket";

const initialState = {
  selectedPost: null,
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    updateSelectedPost: (state, action) => {
      console.log("action.type", action.type);
      switch (action.payload.type) {
        case "react": {
          const { postId, reactUserId, isAddedToList } = action.payload;
          if (state.selectedPost?._id === postId) {
            if (isAddedToList) {
              state.selectedPost.likes.push({ userId: reactUserId });
            } else {
              const index = state.selectedPost.likes.findIndex(
                (userId) => userId == reactUserId
              );
              state.selectedPost.likes.splice(index, 1);
            }
          }

          break;
        }
        case "comment": {
          const { postId, newComment } = action.payload;
          console.log("newComment", newComment);
          if (state.selectedPost?._id === postId) {
            state.selectedPost.comments.push(newComment);
          }
          break;
        }
      }
    },
    reactPost: (state, action) => {
      // const socket = getSocket();
      // socket.on("react-post", (postId, reactUserId, isAddedToList) => {
      //   if (state.selectedPost?._id === postId) {
      //     if (isAddedToList) {
      //       state.selectedPost.likes.unshift({ userId: reactUserId });
      //     } else {
      //       const index = state.selectedPost.likes.findIndex(
      //         (userId) => userId == reactUserId
      //       );
      //       state.selectedPost.likes.splice(index, 1);
      //     }
      //   }
      // });
    },
    commentPost: (state, action) => {
      // const socket = getSocket();
      // console.log("socket", socket);
      // socket.on("new-comment", (postId, newComment) => {
      //   console.log("new comment", newComment);
      //   if (state.selectedPost?._id === postId) {
      //     state.selectedPost.comments.unshift(newComment);
      //   }
      // });
    },
  },
});

export const { setSelectedPost, reactPost, commentPost, updateSelectedPost } =
  postSlice.actions;
