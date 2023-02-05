import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {
  GetAllPosts,
  DeletePost,
  CreatePost,
  ReactPost,
  UpdatePost,
  CommentPost,
  DeleteComment,
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
        const updatedPost = res.data.updatedPost;
        const newPosts = posts.map((post) => {
          if (post._id == updatedPost._id) {
            return updatedPost;
          } else {
            return post;
          }
        });
        console.log("newPost", newPosts);
        setPosts(newPosts);
      })
      .catch((err) => {
        setError(err);
        console.log("Comment thất bại");
      });
  };
  const HandleDeleteComment = async (postId, commentId) => {
    setIsLoading(true);
    await DeleteComment(postId, commentId)
      .then((res) => {
        setError(null);
        const updatedComments = res.data.updatedComments;
        const newPosts = posts.map((post) => {
          if (post._id == postId) {
            return {
              ...post,
              comments: updatedComments,
            };
          } else return post;
        });
        setPosts(newPosts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error");
        setError(err);
        setIsLoading(false);
      });
  };
  const HandleUpdatePost = async (postId, newPostData) => {
    setIsLoading(true);
    await UpdatePost(postId, newPostData)
      .then((res) => {
        const updatedPost = res.data.updatedPost;
        setIsLoading(false);
        const newPosts = posts.map((post) => {
          if (post._id == updatedPost._id) {
            return updatedPost;
          } else {
            return post;
          }
        });
        setPosts(newPosts);
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
        DeleteComment: HandleDeleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
