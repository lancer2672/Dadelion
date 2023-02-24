import React, { useEffect, useState, useContext } from "react";
import { createContext } from "react";
import { GetChannels } from "./chat.service";
import { AuthenticationContext } from "../authentication/authentication.context";
import socket from "../../utils/socket";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useContext(AuthenticationContext);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      const userId = user._id;
      setIsLoading(true);
      socket.emit("login", userId);
      socket.on("get-channels", (chatChannels) => {
        console.log("ChatChannel", chatChannels);
        setChannels(chatChannels);
      });
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const handleSendMessage = (channelId, userId, newMessage) => {
    socket.emit("send-message", {
      channelId,
      userId,
      newMessage,
    });
    socket.on("updated-channels", (newChannels) => {
      console.log("newChannel", newChannels);
      setChannels(newChannels);
    });
  };
  const joinRoom = (channelId) => {
    socket.emit("join-room", channelId);
  };
  //userId is id of user using this app, this f will find all channels have userId
  const handleGetMembersOfChannel = (userId, channelId) => {
    socket.on("get-channel-members", (channelMembers) => {});
  };
  return (
    <ChatContext.Provider
      value={{
        error,
        channels,
        handleSendMessage,
        joinRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
