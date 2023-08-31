import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";

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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("new-friendStatus", (newStatus) => {
            updateCachedData((draft) => {
              console.log("Draft1", current(draft));
              draft.data = newStatus;
              console.log("Draft2 ", current(draft));
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetFriendRequestsQuery, useCheckFriendStatusQuery } =
  friendRequestApi;
