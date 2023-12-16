import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPost: null,
  repliedComment: null,
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //handled in middleware
    reactPost: (state, action) => {},
    commentPost: (state, action) => {},
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
      console.log("SET SELECTED POST CALLED", action.payload);
    },

    updateSelectedPost: (state, action) => {
      switch (action.payload.type) {
        case "react": {
          const { postId, reactUserId, isAddedToList } = action.payload;
          console.log("isAddedToList", isAddedToList);
          if (state.selectedPost?._id === postId && isAddedToList !== null) {
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
          const { postId, newComment, parentId } = action.payload;
          console.log("action.payload;", action.payload);
          if (state.selectedPost?._id === postId) {
            //if reply comment
            if (parentId) {
              const i = state.selectedPost.comments.findIndex(
                (cmt) => cmt._id === parentId
              );
              state.selectedPost.comments[i].replies.unshift(newComment);
            } else {
              state.selectedPost.comments.unshift(newComment);
            }
          }
          break;
        }
      }
    },

    setRepliedComment: (state, action) => {
      if (!action.payload || state.repliedComment?._id === action.payload._id) {
        state.repliedComment = null;
      } else {
        state.repliedComment = action.payload;
      }
    },
  },
});

export const {
  setSelectedPost,
  reactPost,
  commentPost,
  updateSelectedPost,
  setRepliedComment,
} = postSlice.actions;
