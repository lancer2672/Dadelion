import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userSlice";
import { appSlice } from "./slices/appSlice";
import { postSlice } from "./slices/postSlice";
import { notification } from "./slices/notificationSlice";

import { userApi } from "./slices/api/userApiSlice";
import { postApi } from "./slices/api/postApiSlice";
import { chatApi } from "./slices/api/chatApiSlice";
import { notificationApi } from "./slices/api/notificationApiSlice";
import { friendRequestApi } from "./slices/api/friendRequestApiSlice";
import { chatSlice } from "./slices/chatSlice";
import chatMiddleware from "./middlewares/chatMiddleware";
import postMiddleware from "./middlewares/postMiddleware";
import notificationMiddleware from "./middlewares/notificationMiddleware";

export default configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
    chat: chatSlice.reducer,
    notification: notification.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [friendRequestApi.reducerPath]: friendRequestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware)
      .concat(chatApi.middleware)
      .concat(friendRequestApi.middleware)
      .concat(notificationApi.middleware)
      .concat(chatMiddleware())
      .concat(notificationMiddleware())
      .concat(postMiddleware()),
});
