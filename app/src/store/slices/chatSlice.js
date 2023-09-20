import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChannel: null,
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
    unfriend: (state, action) => {},
    sendFriendRequest: (state, action) => {},
    responseFriendRequest: (state, action) => {},

    //
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
    removeSelectedChannel: (state, action) => {
      state.selectedChannel = null;
    },
  },
});

export const {
  joinChannels,
  joinChannel,
  joinRoom,
  typing,
  sendMessage,

  unfriend,
  sendFriendRequest,
  responseFriendRequest,

  setSelectedChannel,
  removeSelectedChannel,
} = chatSlice.actions;
