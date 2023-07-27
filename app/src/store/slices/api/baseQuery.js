import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UrlAPI } from "@src/constants";
import { logout, setToken } from "../userSlice";

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
    const refreshResult = await baseQuery(
      {
        url: "/api/auth/refreshToken",
        method: "POST",
        body: { refreshToken: api.getState().user.refreshToken },
      },
      api
    );
    if (refreshResult.data) {
      api.dispatch(setToken({ token: refreshResult.data.accessToken }));
      // Reconstruct the headers with the new token and make the second request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
