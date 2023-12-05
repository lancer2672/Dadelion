import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";
import { UrlAPI } from "@src/constants";
import { transformChannelData } from "@src/utils/transformData";
const chatRoute = "/chat";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loadChatRoomMessages: builder.query({
      query: (channelId) => `${chatRoute}/messages/${channelId}`,
      transformResponse: (response, meta, arg) => {
        return response.data.messages;
      },

      transformErrorResponse: (response, meta, arg) => response.data.message,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("receive-message", ({ newMess, channelId, type }) => {
            console.log("receive message data", { newMess, channelId, type });
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
    getChannels: builder.query({
      query: (userId) => ({ url: `${chatRoute}/channels`, params: userId }),
      transformResponse: (response, meta, arg) => {
        const channels = response.data.channels;
        const transformedChannel = channels.map((c) => {
          return transformChannelData(c, arg);
        });

        return transformedChannel;
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("new-channel", (newChannel) => {
            socket.emit("join-channels", [newChannel]);
            updateCachedData((draft) => {
              draft.unshift(newChannel);
            });
          });
          socket.on("receive-message", ({ newMess, channelId, type }) => {
            updateCachedData((draft) => {
              const c = draft.findIndex((channel) => channel._id == channelId);
              if (c != -1) {
                let firstElement = draft.shift();
                firstElement.channelMessages.unshift(newMess);
                draft.splice(c, 0, firstElement);
              }
            });
          });

          socket.on("join-chatRoom", (channelId) => {
            updateCachedData((draft) => {
              draft.forEach((channel) => {
                if (channel._id == channelId) {
                  channel.channelMessages = channel.channelMessages.map(
                    (message) => ({ ...message, isSeen: true })
                  );
                }
              });
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
    }),
    getLastMessage: builder.query({
      query: (channelId) => ({
        url: `${chatRoute}/last-message/${channelId}`,
      }),
      transformResponse: (response, meta, arg) => response.data,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("receive-message", ({ newMess, channelId, type }) => {
            updateCachedData((draft) => {
              if (draft.channelId === channelId) {
                draft.lastMessage = newMess;
              }
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
    }),
    findOrCreateChannel: builder.mutation({
      query: (data) => ({
        url: `${chatRoute}/channel/find`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetLastMessageQuery,
  useLoadChatRoomMessagesQuery,
  useFindOrCreateChannelMutation,
} = chatApi;
