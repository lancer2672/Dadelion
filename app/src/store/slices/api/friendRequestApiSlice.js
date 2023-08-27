import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

const friendRequestRoute = "/friend-request";

export const friendRequestApi = createApi({
  reducerPath: "friendRequestApi",
  tagTypes: "FriendRequest",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFriendRequests: builder.query({
      query: () => `${friendRequestRoute}/requests`,
    }),
    checkFriendStatus: builder.query({
      query: (receiverId) => `${friendRequestRoute}/check-status/${receiverId}`,
    }),
  }),
});

export const { useGetFriendRequestsQuery, useCheckFriendStatusQuery } =
  friendRequestApi;
