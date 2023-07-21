import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./slices/userSlice";
import { userApi } from "./services/userService";
import { appSlice } from "./slices/appSlice";
export default configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
