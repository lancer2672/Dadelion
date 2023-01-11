import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {
  GetAllPosts,
  DeletePost,
  CreatePost,
  ReactPost,
  UpdatePost,
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
        setError(null);
      })
      .catch((err) => setError(err));
  };
  const HandleCommentPost = async (postId, content) => {
    await CommentPost(postId, content)
      .then((res) => {
        setError(null);
        console.log("Comment thành công");
      })
      .catch((err) => {
        setError(err);
        console.log("Comment thất bại");
      });
  };
  const HandleUpdatePost = async (postId, newPostData) => {
    setIsLoading(true);
    await UpdatePost(postId, newPostData)
      .then((res) => {
        console.log("post", posts);
        const updatedPost = res.data.updatedPost;
        setIsLoading(false);
        console.log("Cập nhật thành công");
        const newPosts = posts.map((post) => {
          if (post._id == updatedPost._id) {
            return updatedPost;
          } else {
            return post;
          }
        });
        setPosts((post) => newPosts);
        console.log("NewPOst", newPosts);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setError("Cập nhật không thành công");
        console.log("Cập nhật thất bại");
      });
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
        UpdatePost: HandleUpdatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
