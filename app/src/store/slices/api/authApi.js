import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";
import { UrlAPI } from "@src/constants";
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
  useResetPasswordMutation,
  useVerifyEmailQuery,
  useSendVerificationEmailMutation,
} = authApi;
