import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userSlice";
import { userApi } from "./services/userService";
import { appSlice } from "./slices/appSlice";
import { postApi } from "./services/postService";
export default configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,

    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware),
});
