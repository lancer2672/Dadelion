import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  //passed to createReducer
  reducers: {
    setPosts: (state, action) => {
      const newPosts = action.payload;
      state.posts = newPosts;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i]._id == action.payload._id) {
          state.posts[i] = action.payload;
        }
      }
    },
    deletePost: (state, action) => {
      // action.payload = postId
      const indexOfDeletedPost = state.posts.filter((post) => {
        return post._id == action.payload;
      });
      console.log(indexOfDeletedPost);
      if (indexOfDeletedPost) {
        state.posts.splice(indexOfDeletedPost, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts, addPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
