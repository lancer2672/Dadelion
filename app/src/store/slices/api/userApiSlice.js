import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { transformUserData } from "@src/utils/transformHelper";
const userRoute = "/user/";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `${userRoute}/${userId}`,
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
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
      transformErrorResponse: (response, meta, arg) => response.data.message,
    }),
    updateUser: builder.mutation({
      query: ({ newUserData, userId }) => ({
        url: `${userRoute}/${userId}`,
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
  }),
});

export const {
  useGetUserByIdQuery,
  useLoginMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} = userApi;
