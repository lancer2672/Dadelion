import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userSlice";
import { appSlice } from "./slices/appSlice";
import { postSlice } from "./slices/postSlice";

import { userApi } from "./slices/api/userApiSlice";
import { postApi } from "./slices/api/postApiSlice";
import { chatApi } from "./slices/api/chatApiSlice";
import { chatSlice } from "./slices/chatSlice";
import socketMiddleware from "./middlewares/socketMiddleware";
import socket from "@src/utils/socket";

export default configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
    chat: chatSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware)
      .concat(chatApi.middleware)
      .concat(socketMiddleware(socket)),
});
