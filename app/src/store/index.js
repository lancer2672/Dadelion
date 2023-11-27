import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userSlice";
import { appSlice } from "./slices/appSlice";
import { postSlice } from "./slices/postSlice";
import { callSlice } from "./slices/callSlice";
import { notification } from "./slices/notificationSlice";
import { chatSlice } from "./slices/chatSlice";
import { locationSlice } from "./slices/location.Slice";

import { userApi } from "./slices/api/userApiSlice";
import { postApi } from "./slices/api/postApiSlice";
import { chatApi } from "./slices/api/chatApiSlice";
import { notificationApi } from "./slices/api/notificationApiSlice";
import { friendRequestApi } from "./slices/api/friendRequestApiSlice";

import chatMiddleware from "./middlewares/chatMiddleware";
import postMiddleware from "./middlewares/postMiddleware";
import notificationMiddleware from "./middlewares/notificationMiddleware";
import locationMiddleware from "./middlewares/locationMiddleware";

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
