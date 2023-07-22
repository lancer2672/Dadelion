import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { UrlAPI } from "@src/constants";

const postRoute = "/post/";

export const postApi = createApi({
  reducerPath: "post",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => `${postRoute}`,
      transformResponse: (response, meta, arg) => {
        if (response.data) {
        }
        const tranformedPosts = response.data.posts.map((post) => {
          if (post.image != null) {
            post.image = `${UrlAPI}/${post.image}`;
          }
          return post;
        });
        response.data.tranformedPosts = tranformedPosts;
        return response.data;
      },
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (newPostFormData) => ({
        url: `${postRoute}/create`,
        method: "POST",
        body: newPostFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${postRoute}/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, newPostData }) => ({
        url: `${postRoute}/${postId}`,
        method: "PUT",
        body: newPostData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    reactPost: builder.mutation({
      query: (postId) => ({
        url: `${postRoute}/react/${postId}`,
        method: "PUT",
        body: { react: true },
      }),
      invalidatesTags: ["Post"],
    }),
    commentPost: builder.mutation({
      query: ({ postId, content }) => ({
        url: `${postRoute}/comment/${postId}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Post"],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `${postRoute}/comment/${postId}`,
        method: "DELETE",
        body: { commentId },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useReactPostMutation,
  useCommentPostMutation,
  useDeleteCommentMutation,
} = postApi;
