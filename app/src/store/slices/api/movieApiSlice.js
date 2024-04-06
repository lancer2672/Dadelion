import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
export const movieApi = createApi({
  reducerPath: "movieApi",
  tagTypes: "Movie",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getListGenres: builder.query({
      query: ({ skip = 0, limit = 10 }) =>
        `movie/genres?skip=${skip}&limit=${limit}`,
    }),
    getListMovies: builder.query({
      query: ({ skip = 0, limit = 10 }) => `movies?skip=${skip}&limit=${limit}`,
    }),
    getMovie: builder.query({
      query: (id) => `movies/${id}`,
    }),
    getMoviesByGenre: builder.query({
      query: ({ genre_id, skip = 0, limit = 10 }) =>
        `movies/genre/${genre_id}?skip=${skip}&limit=${limit}`,
    }),
    getMoviesBySerie: builder.query({
      query: ({ id, skip = 0, limit = 10 }) =>
        `movies/serie/${id}?skip=${skip}&limit=${limit}`,
    }),
    getRecentMovies: builder.query({
      query: ({ skip = 0, limit = 10 }) =>
        `movies/recent?skip=${skip}&limit=${limit}`,
    }),
    searchMovies: builder.query({
      query: ({ searchTerm, skip = 0, limit = 10 }) =>
        `movies/search?term=${searchTerm}`,
    }),
    getVotesByUser: builder.query({
      query: ({ user_id }) => `movie/votes/user/${user_id}`,
    }),
    streamMovie: builder.query({
      query: ({ movieUrl }) => `/movies/stream/?movieUrl=${movieUrl}`,
    }),
  }),
});

export const {
  useGetListGenresQuery,
  useGetListMoviesQuery,
  useGetMovieQuery,
  useGetMoviesByGenreQuery,
  useGetMoviesBySerieQuery,
  useGetRecentMoviesQuery,
  useSearchMoviesQuery,
  useGetVotesByUserQuery,
} = movieApi;
