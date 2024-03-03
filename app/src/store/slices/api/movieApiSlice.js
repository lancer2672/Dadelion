import { current } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getSocket } from "@src/utils/socket";
import { baseQueryWithReauth } from "./baseQuery";

const genreRoute = "/genres";

export const movieApiSlice = createApi({
  reducerPath: "movieApiSlice",
  tagTypes: "FriendRequest",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getListGenres: builder.query({
      query: () => `${genreRoute}`,
      //   transformResponse: (response, meta, arg) => response.data.requests,
    }),
  }),
});

export const { usegetListGenresQuery } = movieApiSlice;
