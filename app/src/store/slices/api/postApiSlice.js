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
            console.log("post.image", post.image);
            post.image = `${UrlAPI}\\${post.image}`;
            console.log("post.image", post.image);
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
          socket.on("new-comment", ({ postId, newComment, parentId }) => {
            updateCachedData((draft) => {
              const i = draft.posts.findIndex((post) => post._id == postId);
              if (i >= 0) {
                // if reply comment
                let newCommentList;
                if (parentId) {
                  const j = draft.posts[i].comments.findIndex(
                    (cmt) => cmt._id === parentId
                  );
                  // assign new object comment to post -> trigger useEffect
                  newCommentList = [...draft.posts[i].comments];
                  comments[j].replies.unshift(newComment);
                  draft.posts[i].comments = newCommentList;
                } else {
                  newCommentList = [...draft.posts[i].comments];
                  newCommentList.unshift(newComment);
                  draft.posts[i].comments = newCommentList;
                }
              }
              console.log("current Draft", current(draft), i);
            });
          });
          socket.on("react-post", (postId, reactUserId, isAddedToList) => {
            console.log("isAddedToList", isAddedToList);
            updateCachedData((draft) => {
              const i = draft.posts.findIndex((post) => post._id == postId);
              if (i >= 0) {
                if (isAddedToList === true) {
                  draft.posts[i].likes.unshift({ userId: reactUserId });
                } else if (isAddedToList === false) {
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
      query: (userId) => `${postRoute}/${userId}`,
      transformResponse: (response, meta, arg) => {
        if (response.data) {
        }
        const tranformedPosts = response.data.posts.map((post) => {
          if (post.image != null) {
            post.image = `${UrlAPI}\\${post.image}`;
          }
          return post;
        });
        response.data.tranformedPosts = tranformedPosts;
        return response.data.posts;
      },
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: (postId) => `${postRoute}/?postId=${postId}`,
      transformResponse: (response, meta, arg) => {
        if (response.data.post.image) {
          response.data.post.image = `${UrlAPI}\\${response.data.post.image}`;
        }
        return response.data.post;
      },
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${postRoute}/create`,
        method: "POST",
        body: data,
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
      query: ({ postId, data }) => ({
        url: `${postRoute}/${postId}`,
        method: "PUT",
        body: data,
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
