import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { UrlAPI } from "@src/constants";
import { Blurhash } from "react-native-blurhash";
import { getSocket } from "@src/utils/socket";
import { current } from "@reduxjs/toolkit";

const postRoute = "/post";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => `${postRoute}/all`,
      transformResponse: (response, meta, arg) => {
        const posts = response.data.posts.map((post) => {
          if (post.image != null) {
            post.image = `${UrlAPI}/${post.image}`;
          }
          return post;
        });

        return { posts };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const socket = getSocket();
          socket.on("new-comment", (postId, newComment) => {
            updateCachedData((draft) => {
              const i = draft.posts.findIndex((post) => post._id == postId);
              if (i >= 0) {
                draft.posts[i].comments.unshift(newComment);
              }
            });
          });
          socket.on("react-post", (postId, reactUserId, isAddedToList) => {
            updateCachedData((draft) => {
              const i = draft.posts.findIndex((post) => post._id == postId);
              if (i >= 0) {
                if (isAddedToList) {
                  draft.posts[i].likes.unshift({ userId: reactUserId });
                } else {
                  const index = draft.posts[i].likes.findIndex(
                    (userId) => userId == reactUserId
                  );
                  draft.posts[i].likes.splice(index, 1);
                }
              }
            });
          });
        } catch (err) {
          console.log("err", err);
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
      },
      providesTags: ["Post"],
    }),

    getPostByUserId: builder.query({
      query: () => `${postRoute}/`,
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
        return response.data.posts;
      },
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: (postId) => `${postRoute}/${postId}`,
      transformResponse: (response, meta, arg) => {
        if (response.data.post.image) {
          response.data.post.image = `${UrlAPI}/${response.data.post.image}`;
        }
        return response.data.post;
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
    // reactPost: builder.mutation({
    //   query: (postId) => ({
    //     url: `${postRoute}/react/${postId}`,
    //     method: "PUT",
    //     body: { react: true },
    //   }),
    //   invalidatesTags: ["Post"],
    // }),
    // commentPost: builder.mutation({
    //   query: ({ postId, content }) => ({
    //     url: `${postRoute}/comment/${postId}`,
    //     method: "PUT",
    //     body: { content },
    //   }),
    //   invalidatesTags: ["Post"],
    // }),
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
  useGetPostByIdQuery,
  useGetAllPostsQuery,
  useGetPostByUserIdQuery,

  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,

  // useReactPostMutation,
  // useCommentPostMutation,
  useDeleteCommentMutation,
} = postApi;
