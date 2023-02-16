import React, { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
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
  const { isAuthenticated } = useContext(AuthenticationContext);
  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        setIsLoading(true);
        try {
          const res = await GetAllPosts();

          setPosts(res.data.posts);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setError(err);
          console.log("err", err);
        }
      })();
    } else {
      setPosts([]);
    }
  }, [isAuthenticated]);

  const HandleDeletePost = async (postId) => {
    setIsLoading(true);
    try {
      await DeletePost(postId);
      const newPosts = posts.filter((post) => post._id !== postId);
      setPosts(newPosts);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setError("Xóa post không thành công");
      console.log(err);
    }
  };
  const HandleCreatePost = async (newPostFormData) => {
    setIsLoading(true);
    try {
      const res = await CreatePost(newPostFormData);
      setPosts([...posts, res.data.newPost]);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError("Tạo post không thành công");
      setIsLoading(false);
      console.log("err", err);
    }
  };
  const HandleReactPost = async (postId) => {
    try {
      await ReactPost(postId);
      setError(null);
    } catch (err) {
      console.log("err");
      setError("Lỗi!!!");
    }
  };
  const HandleCommentPost = async (postId, content) => {
    try {
      const res = await CommentPost(postId, content);
      setError(null);
      const updatedPost = res.data.updatedPost;
      const newPosts = posts.map((post) => {
        if (post._id == updatedPost._id) {
          return updatedPost;
        } else {
          return post;
        }
      });
      setPosts(newPosts);
    } catch (err) {
      setError("Lỗi!!!");
      console.log("err", err);
    }
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
        setError("Lỗi!!!");
        setIsLoading(false);
      });
  };
  const HandleUpdatePost = async (postId, newPostData) => {
    setIsLoading(true);
    await UpdatePost(postId, newPostData)
      .then((res) => {
        const updatedPost = res.data.updatedPost;
        console.log("updatedPost", updatedPost._id);
        setIsLoading(false);
        const newPosts = posts.map((post) => {
          if (post._id == updatedPost._id) {
            return updatedPost;
          } else {
            return post;
          }
        });
        setPosts(newPosts);

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
