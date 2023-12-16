import { current } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getSocket } from "@src/utils/socket";
import { baseQueryWithReauth } from "./baseQuery";
const notificationRoute = "/notification";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({ url: `${notificationRoute}/` }),
      transformResponse: (response, meta, arg) => response.data.notifications,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();

          socket.on("mark-seen-notifications", () => {
            updateCachedData((draft) => {
              console.log("notif draft", current(draft));
              draft.notifications = draft.notifications.map((notification) => {
                return {
                  ...notification,
                  isSeen: true,
                };
              });
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
      providesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `${notificationRoute}/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery, useDeleteNotificationMutation } =
  notificationApi;
