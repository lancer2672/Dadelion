import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { GetAllPosts } from "./post.service";

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

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
