import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UrlAPI } from "@src/constants";
import { logoutUser } from "../userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: UrlAPI,
  prepareHeaders: async (headers, { getState }) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      api.dispatch(logoutUser());
      return;
    }
    const refreshResult = await baseQuery(
      {
        url: "/api/auth/refresh-token",
        method: "POST",
        body: {
          refreshToken: JSON.parse(refreshToken),
        },
      },
      api
    );
    if (refreshResult.data) {
      await AsyncStorage.setItem(
        "token",
        JSON.stringify(refreshResult.data.accessToken)
      );
      // retry the initial query with new token
      args.headers = {
        ...args.headers,
        Authorization: `Bearer ${refreshResult.data.accessToken}`,
      };
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }
  return result;
};
