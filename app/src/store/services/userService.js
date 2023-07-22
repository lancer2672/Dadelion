import { createApi } from "@reduxjs/toolkit/query/react";
import { transformUserInformation } from "@src/services/authentication/authentication.service";
import { baseQueryWithReauth } from "./baseQuery";

const userRoute = "/user/";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `${userRoute}/${userId}`,
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserInformation(response.data.user);
        return { ...response.data, user: transformedUser };
      },
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    login: builder.mutation({
      query: (authData) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: authData,
      }),
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserInformation(response.data.user);
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
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: `/api/auth/register`,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.message,
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLoginMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} = userApi;
