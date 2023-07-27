import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import socket from "@src/utils/socket";
import { transformMessageData } from "@src/utils/transformHelper"; // Assuming you have a function to transform message data
import { current } from "@reduxjs/toolkit";
const channelRoute = "/channel/";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loadChatRoomMessages: builder.query({
      query: (channelId) => `${channelRoute}/messages/${channelId}`,
      transformResponse: (response, meta, arg) => response.data.messages || [],
      transformErrorResponse: (response, meta, arg) => response.data.message,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          socket.on("receive-message", (newMess) => {
            updateCachedData((draft) => {
              draft.unshift(newMess);
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
    }),
    getChannelMembers: builder.query({
      query: (channelId) => `${channelRoute}/${channelId}/members`,
      transformErrorResponse: (response, meta, arg) => response.data.message,
    }),
  }),
});

export const { useLoadChatRoomMessagesQuery, useGetChannelMembersQuery } =
  chatApi;
