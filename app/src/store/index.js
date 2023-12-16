import { configureStore } from "@reduxjs/toolkit";

import { appSlice } from "./slices/appSlice";
import { callSlice } from "./slices/callSlice";
import { chatSlice } from "./slices/chatSlice";
import { locationSlice } from "./slices/location.Slice";
import { notification } from "./slices/notificationSlice";
import { postSlice } from "./slices/postSlice";
import { userSlice } from "./slices/userSlice";

import { chatApi } from "./slices/api/chatApiSlice";
import { friendRequestApi } from "./slices/api/friendRequestApiSlice";
import { notificationApi } from "./slices/api/notificationApiSlice";
import { postApi } from "./slices/api/postApiSlice";
import { userApi } from "./slices/api/userApiSlice";

import chatMiddleware from "./middlewares/chatMiddleware";
import locationMiddleware from "./middlewares/locationMiddleware";
import notificationMiddleware from "./middlewares/notificationMiddleware";
import postMiddleware from "./middlewares/postMiddleware";

import { createLogger } from "redux-logger";

const logger = createLogger();
export default configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    call: callSlice.reducer,
    post: postSlice.reducer,
    chat: chatSlice.reducer,
    location: locationSlice.reducer,
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
      .concat(locationMiddleware())
      .concat(postMiddleware()),
  // .concat(logger),
});
