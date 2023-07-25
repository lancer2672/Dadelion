import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userSlice";
import { appSlice } from "./slices/appSlice";
import { postSlice } from "./slices/postSlice";

import { userApi } from "./services/userService";
import { postApi } from "./services/postService";

export default configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,

    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware),
});
