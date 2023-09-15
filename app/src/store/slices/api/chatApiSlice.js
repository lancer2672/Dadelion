import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";
import { UrlAPI } from "@src/constants";
const chatRoute = "/chat";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loadChatRoomMessages: builder.query({
      query: (channelId) => `${chatRoute}/messages/${channelId}`,
      transformResponse: (response, meta, arg) => {
        response.data.messages = response.data.messages.map((mes) => {
          const imageUrls = mes.imageUrls
            ? mes.imageUrls.map((imageUrl) => {
                return `${UrlAPI}${imageUrl}`;
              })
            : [];
          return {
            ...mes,
            imageUrls,
          };
        });
        return response.data.messages || [];
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
          socket.on("receive-message", (newMess, channelId) => {
            updateCachedData((draft) => {
              draft.unshift(newMess);
            });
          });
          socket.on("receive-image", (newMess) => {
            newMess.imageUrls = newMess.imageUrls.map((imageUrl) => {
              return `${UrlAPI}${imageUrl}`;
            });
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
      transformResponse: (response, meta, arg) => response.data.channels || [],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("new-channel", (newChannel) => {
            updateCachedData((draft) => {
              draft.unshift(newChannel);
            });
          });
          socket.on("receive-message", (newMess, channelId) => {
            updateCachedData((draft) => {
              const c = draft.findIndex((channel) => channel._id == channelId);
              if (c != -1) {
                let firstElement = draft.shift();
                firstElement.channelMessages.unshift(newMess);
                draft.splice(c, 0, firstElement);
              }
            });
          });
          socket.on("receive-image", (newMess, channelId) => {
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
          socket.on("receive-message", (newMess, channelId) => {
            updateCachedData((draft) => {
              if (draft.channelId === channelId) {
                draft.lastMessage = newMess;
              }
            });
          });
          socket.on("receive-image", (newMess, channelId) => {
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
        url: `${chatRoute}/channel/findOrCreate`,
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
