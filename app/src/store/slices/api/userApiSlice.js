import { createApi } from "@reduxjs/toolkit/query/react";
import { getSocket } from "@src/utils/socket";
import { transformUsersData } from "@src/utils/transformData";
import { baseQueryWithReauth } from "./baseQuery";

const userRoute = "/user";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User", "SearchHistory"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `${userRoute}/${userId}`,
      transformResponse: async (response, meta, arg) => {
        const transformedUser = await transformUsersData([response.data.user]);
        console.log("transformedUser", response.data, transformedUser);
        return transformedUser[0];
      },
      providesTags: ["User"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("online-users", (onlineUserIds) => {
            updateCachedData((draft) => {
              const userId = draft.user._id;
              if (onlineUserIds[userId] != null) {
                draft.user.isOnline = 1;
              }
            });
          });
          socket.on("offline-users", (offlineUserId) => {
            updateCachedData((draft) => {
              const userId = draft.user._id;
              if (offlineUserId == userId) {
                draft.user.isOnline = 0;
                draft.user.lastOnline = new Date().toISOString();
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
    getListUser: builder.mutation({
      query: (listIds) => ({
        url: `${userRoute}/list`,
        method: "POST",
        body: { listIds },
      }),
      transformResponse: async (response, meta, arg) => {
        // response.data.users = response.data.users.map((user) => {
        //   return transformUsersData(user);
        // });
        return await transformUsersData(response.data.users);
      },
    }),
    getAllFriends: builder.query({
      query: () => `${userRoute}/friend/get-all`,
      transformResponse: async (response, meta, arg) => {
        return await transformUsersData(response.data.friends);
      },
    }),
    searchUser: builder.query({
      query: (keyword) => `${userRoute}/search/?q=${keyword}`,
      transformResponse: async (response, meta, arg) => {
        return await transformUsersData(response.data);
      },
    }),
    getSearchHistory: builder.query({
      query: () => `${userRoute}/search-history/recent`,
      transformResponse: async (response, meta, arg) => {
        return await transformUsersData(response.data);
      },

      providesTags: ["SearchHistory"],
    }),
    addUserToSearchHistory: builder.mutation({
      query: (userId) => ({
        url: `${userRoute}/search-history/add`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["SearchHistory"],
    }),
    removeUserFromSearchHistory: builder.mutation({
      query: (userId) => ({
        url: `${userRoute}/search-history/remove/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SearchHistory"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetListUserMutation,
  useSearchUserQuery,
  useGetAllFriendsQuery,

  useGetSearchHistoryQuery,
  useAddUserToSearchHistoryMutation,
  useRemoveUserFromSearchHistoryMutation,
} = userApi;
