import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { userApi } from "./services/userService";
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // Add any other middleware you need
      userApi.middleware
    ),
});
