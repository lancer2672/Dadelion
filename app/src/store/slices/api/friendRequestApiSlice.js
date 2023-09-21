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
      transformResponse: (response, meta, arg) => response.data.requests,

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on(
            "response-friendRequest",
            ({ requestId, responseValue }) => {
              updateCachedData((draft) => {
                const index = draft.findIndex(
                  (request) => request._id == requestId
                );

                if (index != -1) {
                  draft.splice(index, 1);
                }
              });
            }
          );
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
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
          // socket.on(
          //   "response-friendRequest",
          //   ({ requestId, responseValue }) => {
          //     updateCachedData((draft) => {
          //       //draft = {"data": {"result": "sendFriendRequest"}, "message": "success"}
          //       if (responseValue == "accept") {
          //         draft.data.result = "friend";
          //       } else if (responseValue == "decline") {
          //         draft.data.result = "sendFriendRequest";
          //       }
          //     });
          //   }
          // );
          // socket.on("send-friendRequest", (state) => {
          //   updateCachedData((draft) => {
          //     draft.data.result = state;
          //   });
          // });
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
