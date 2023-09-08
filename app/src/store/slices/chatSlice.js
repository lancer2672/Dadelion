import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // messages stored in cache of chatService
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    //logic handled in socket middleware
    joinChannels: (state, action) => {},
    joinChannel: (state, action) => {},
    typing: (state, action) => {},
    joinRoom: (state, action) => {},
    sendMessage: (state, action) => {},
    sendImage: (state, action) => {},
    sendFriendRequest: (state, action) => {},
    responseFriendRequest: (state, action) => {},
  },
});

export const {
  joinChannels,
  joinChannel,
  joinRoom,
  typing,
  sendMessage,
  sendImage,
  sendFriendRequest,
  responseFriendRequest,
} = chatSlice.actions;
