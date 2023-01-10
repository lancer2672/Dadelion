/* eslint-disable prettier/prettier */
import { UrlAPI } from "../../constants";
import axios from "axios";

export const GetAllPosts = async () => {
  return await axios.get(`${UrlAPI}/post/`, {});
};
export const DeletePost = (postId) => {
  return axios.delete(`${UrlAPI}/post/${postId}`);
};
export const CreatePost = (newPostFormData) => {
  return axios.post(`${UrlAPI}/post/create`, newPostFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const ReactPost = (postId) => {
  return axios.put(`${UrlAPI}/post/react/${postId}`, {
    react: true,
  });
};

export const CommentPost = (postId, content) => {
  return axios.put(`${UrlAPI}/post/${postId}`, {
    content,
  });
};
