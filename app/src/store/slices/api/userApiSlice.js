import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { transformUserData } from "@src/utils/transformHelper";
import { getSocket } from "@src/utils/socket";

const userRoute = "/user";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: "User",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `${userRoute}/${userId}`,
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
      },
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
    login: builder.mutation({
      query: (authData) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: authData,
      }),
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
      },
      transformErrorResponse: (response, meta, arg) => {
        response.data.message;
      },
    }),
    getListUser: builder.mutation({
      query: (listIds) => ({
        url: `${userRoute}/list`,
        method: "POST",
        body: { listIds },
      }),
      transformResponse: (response, meta, arg) => {
        console.log("response.data.user", response.data);
        response.data.users = response.data.users.map((user) => {
          return transformUserData(user);
        });
        return response.data.users;
      },
    }),
    updateUser: builder.mutation({
      query: ({ newUserData, userId }) => ({
        url: `${userRoute}/update/${userId}`,
        method: "PUT",
        body: newUserData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
      },
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `/api/auth/register`,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data.message,
    }),
    sendFriendRequest: builder.mutation({
      query: (userData) => ({
        url: `friend/register`,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data.message,
    }),
    acceptFriendRequest: builder.mutation({
      query: (userData) => ({
        url: `friend/register`,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.data.message,
    }),
    saveFCMtoken: builder.mutation({
      query: (token) => ({
        url: `${userRoute}/save-token`,
        method: "PUT",
        body: { token },
      }),
    }),
    searchUser: builder.query({
      query: (keyword) => `${userRoute}/search/?q=${keyword}`,
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetListUserMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
  useSaveFCMtokenMutation,
  useSearchUserQuery,
} = userApi;
