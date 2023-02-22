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

      (async () => {
        try {
          const channels = await GetChannels();
          setChannels(channels);
        } catch (err) {
          console.log("err");
          setError("Không thể tải dữ liệu");
        }
      })();
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
