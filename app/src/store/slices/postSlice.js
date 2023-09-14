import { createSlice } from "@reduxjs/toolkit";

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
    reactPost: () => {},
    commentPost: () => {},
  },
});

export const { setSelectedPost, reactPost, commentPost } = postSlice.actions;
