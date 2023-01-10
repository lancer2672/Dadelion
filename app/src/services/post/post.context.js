import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {
  GetAllPosts,
  DeletePost,
  CreatePost,
  ReactPost,
  CommentPost,
} from "./post.service";

export const PostContext = createContext();
export const PostContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    GetAllPosts()
      .then((response) => {
        setPosts(response.data.posts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Lỗi");
        setIsLoading(false);
        setError(err);
      });
  }, []);
  const HandleDeletePost = async (postId) => {
    setIsLoading(true);
    await DeletePost(postId)
      .then((res) => {
        const newPosts = posts.filter((post, index) => {
          return post._id !== postId;
        });
        setPosts(newPosts);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Lỗi! Xóa không thành công");
      });
  };
  const HandleCreatePost = async (newPostFormData) => {
    setIsLoading(true);
    await CreatePost(newPostFormData)
      .then((res) => {
        setPosts([...posts, res.data.newPost]);
        setIsLoading(false);
        setError(null);
      })
      .catch(function (error) {
        setIsLoading(false);
        setError("Lỗi! Tạo bài đăng không thành công");
      });
  };
  const HandleReactPost = async (postId) => {
    await ReactPost(postId)
      .then((res) => {
        console.log("Thành Công");
        setError(null);
      })
      .catch((err) => setError(err));
    console.log(" Done Handling");
  };
  const HandleCommentPost = async (content) => {
    CommentPost(content);
  };
  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        error,
        DeletePost: HandleDeletePost,
        CreatePost: HandleCreatePost,
        ReactPost: HandleReactPost,
        CommentPost: HandleCommentPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
