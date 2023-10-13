import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";
import { UrlAPI } from "@src/constants";
const uploadRoute = "/upload";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: `upload`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        if (response.data.fileUrl) {
          response.data.fileUrl = `${UrlAPI}\\${response.data.fileUrl}`;
        }
        return response.data;
      },
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
