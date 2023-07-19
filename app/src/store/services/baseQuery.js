import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UrlAPI } from "@src/constants";
import { loggout, setToken } from "../slices/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: UrlAPI,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      "/api/auth/refreshToken",
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(setToken(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggout());
    }
  }
  return result;
};
