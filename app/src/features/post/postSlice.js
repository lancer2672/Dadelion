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
  },
});

// Action creators are generated for each case reducer function
export const { setPosts } = postSlice.actions;

export default postSlice.reducer;
