import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UrlAPI } from "@src/constants";
import { transformUserInformation } from "@src/services/authentication/authentication.service";
import type { User } from "@src/type";

const user = "/user/";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: UrlAPI }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (name) => `${user}/${name}`,
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
    createUser: builder.mutation({
      query: (userData) => ({
        url: user,
        method: "POST",
        body: userData,
      }),
      transformResponse: (response, meta, arg) => response.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

export const { useGetUserByIdQuery, useLoginMutation, useCreateUserMutation } =
  userApi;
