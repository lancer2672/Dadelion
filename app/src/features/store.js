import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import postSlice from "./post/postSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
  },
});
