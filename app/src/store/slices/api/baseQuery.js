import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UrlAPI } from "@src/constants";
import { logoutUser } from "../userSlice";
import { SERVER_API_KEY } from "@env";

const baseQuery = fetchBaseQuery({
  baseUrl: UrlAPI,
  prepareHeaders: async (headers, { getState }) => {
    headers.set("x-api-key", SERVER_API_KEY);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `${JSON.parse(token)}`);
    }
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      headers.set("x-client-id", `${JSON.parse(userId)}`);
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
        Authorization: `${refreshResult.data.accessToken}`,
      };
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }
  return result;
};
