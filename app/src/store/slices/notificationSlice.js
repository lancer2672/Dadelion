import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    //logic handled in socket middleware
    markSeenNotifications: (state, action) => {},
  },
});

export const { markSeenNotifications } = notification.actions;
