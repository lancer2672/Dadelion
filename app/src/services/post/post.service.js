/* eslint-disable prettier/prettier */
import { UrlAPI } from "../../constants";
import axios from "axios";

export const getAllPosts = () => {
  return axios.get(`${UrlAPI}/post/`, {});
};

export const deletePost = (postId) => {
  return axios.delete(`${UrlAPI}/post/${postId}`);
};

export const createPost = (newPostData) => {
  return axios.post(`${UrlAPI}/post/create`, newPostData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const reactPost = (postId) => {
  return axios.put(`${UrlAPI}/post/react/${postId}`, {
    react: true,
  });
};

export const commentPost = (postId, content) => {
  return axios.put(`${UrlAPI}/post/comment/${postId}`, {
    content,
  });
};

export const deleteComment = (postId, commentId) => {
  return axios.delete(`${UrlAPI}/post/comment/${postId}`, {
    data: {
      commentId,
    },
  });
};

export const updatePost = (postId, newPostData) => {
  return axios.put(`${UrlAPI}/post/${postId}`, newPostData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
