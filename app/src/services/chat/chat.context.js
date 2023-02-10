import React, { useEffect, useState, useContext } from "react";
import { createContext } from "react";
import { GetChannels } from "./chat.service";
import { AuthenticationContext } from "../authentication/authentication.context";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthenticationContext);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      GetChannels()
        .then((response) => {
          setChannels(response.data.channels);
        })
        .catch((err) => setError(err));
    }
  }, [isAuthenticated]);
  return (
    <ChatContext.Provider
      value={{
        error,
        channels,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
