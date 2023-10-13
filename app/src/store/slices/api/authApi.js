import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";
import { UrlAPI } from "@src/constants";
import { transformUserData } from "@src/utils/transformHelper";
const authRoute = "/api/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    verifyEmail: builder.query({
      query: ({ code, password, isResetPassword }) => ({
        url: `${authRoute}/verify-email/?code=${code}&password=${password}&isResetPassword=${isResetPassword}`,
      }),
      //   transformResponse: (response, meta, arg) => response.data
    }),

    sendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: `${authRoute}/send-email-verification`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${authRoute}/reset-password`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${authRoute}/change-password`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
    login: builder.mutation({
      query: (authData) => ({
        url: `${authRoute}/login`,
        method: "POST",
        body: authData,
      }),
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
      },
      transformErrorResponse: (response, meta, arg) => {
        return response.data.message || response.data;
      },
    }),
    loginWithGoogle: builder.mutation({
      query: (idToken) => ({
        url: `${authRoute}/google`,
        method: "POST",
        body: { idToken },
      }),
      transformResponse: (response, meta, arg) => {
        const transformedUser = transformUserData(response.data.user);
        return { ...response.data, user: transformedUser };
      },
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useVerifyEmailQuery,
  useSendVerificationEmailMutation,
  useLoginMutation,
  useLoginWithGoogleMutation,
  useChangePasswordMutation,
} = authApi;
