import React, { useEffect, useState, useContext } from "react";
import { createContext } from "react";
import { getChannels, getRoomMessages } from "./chat.service";
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
        setChannels(chatChannels);
      });
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  const registerMessageListener = (setListMessage) => {
    console.log("registered");
    socket.on("updated-channels", (newChannels) => {
      console.log(
        "newChannels.channelMessages",
        newChannels.channelMessages.length
      );
      setListMessage(() => newChannels.channelMessages);
      setChannels(newChannels);
    });
  };
  const handleSendMessage = (channelId, userId, newMessage) => {
    socket.emit("send-message", {
      channelId,
      userId,
      newMessage,
    });
  };

  const joinRoom = (channelId) => {
    socket.emit("join-chat-room", channelId);
  };
  const loadChatRoomMessages = async (channelId) => {
    try {
      const messages = await getRoomMessages(channelId);
      console.log("messages", messages);
      return messages;
    } catch (er) {
      console.log(er);
    }
  };

  const handleGetMembersOfChannel = (userId, channelId) => {
    socket.on("get-channel-members", (channelMembers) => {});
  };
  return (
    <ChatContext.Provider
      value={{
        error,
        channels,
        handleSendMessage,
        registerMessageListener,
        loadChatRoomMessages,
        joinRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
