import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // messages stored in cache of chatService
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    //logic handled in socket middleware
    joinRoom: (state, action) => {},
    sendMessage: (state, action) => {},
  },
});

export const { joinRoom, sendMessage } = chatSlice.actions;
