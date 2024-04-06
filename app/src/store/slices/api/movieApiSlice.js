import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
export const movieApi = createApi({
  reducerPath: "movieApi",
  tagTypes: "Movie",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getListGenres: builder.query({
      query: ({ offset = 0, limit = 10 }) =>
        `movie/genres?offset=${offset}&limit=${limit}`,
      transformResponse: (response) => response.data,
    }),
    getListMovies: builder.query({
      query: ({ offset = 0, limit = 10 }) =>
        `movies?offset=${offset}&limit=${limit}`,
      transformResponse: (response) => response.data,
    }),
    getMovie: builder.query({
      query: (id) => `movies/${id}`,
      transformResponse: (response) => response.data,
    }),
    getMoviesByGenre: builder.query({
      query: ({ genre_id, offset = 0, limit = 10 }) =>
        `movies/genre/${genre_id}?offset=${offset}&limit=${limit}`,
      transformResponse: (response) => response.data,
    }),
    getMoviesBySerie: builder.query({
      query: ({ id, offset = 0, limit = 10 }) =>
        `movies/serie/${id}?offset=${offset}&limit=${limit}`,
      transformResponse: (response) => response.data,
    }),
    getMoviesWatching: builder.query({
      query: ({ userId, offset = 0, limit = 10 }) =>
        `/movies/watching/${userId}?offset=${offset}&limit=${limit}`,
      transformResponse: (response) => response.data,
    }),
    getRecentMovies: builder.query({
      query: ({ offset = 0, limit = 10 }) =>
        `movies/recent?offset=${offset}&limit=${limit}`,
      transformResponse: (response) => response.data,
    }),
    searchMovies: builder.query({
      query: ({ searchTerm, offset = 0, limit = 10 }) =>
        `movies/search?term=${searchTerm}`,
      transformResponse: (response) => response.data,
    }),
    getVotesByUser: builder.query({
      query: ({ user_id }) => `movie/votes/user/${user_id}`,
      transformResponse: (response) => response.data,
    }),
    streamMovie: builder.query({
      query: ({ movieUrl }) => `/movies/stream/?movieUrl=${movieUrl}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetListGenresQuery,
  useGetListMoviesQuery,
  useGetMovieQuery,
  useGetMoviesByGenreQuery,
  useGetMoviesBySerieQuery,
  useGetMoviesWatchingQuery,
  useGetRecentMoviesQuery,
  useSearchMoviesQuery,
  useGetVotesByUserQuery,
} = movieApi;
