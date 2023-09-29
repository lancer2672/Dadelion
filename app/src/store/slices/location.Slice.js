import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
  friendLocation: [],
};
export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    //logic handled in socket middleware
    sendLocation: (state, action) => {},
    startTracking: (state, action) => {},
    stopTracking: (state, action) => {},

    setLocation: (state, action) => {
      state.location = action.payload.location;
      console.log("set location", state.location);
    },
    setFriendLocation: (state, action) => {
      state.friendLocation = action.payload;
      console.log(
        "setFriendLocation - state.friendLocation",
        state.friendLocation
      );
    },
    removeFriendLocation: (state, action) => {
      const friendId = action.payload;
      state.friendLocation = state.friendLocation.filter((f) => {
        f.userId != friendId;
      });
      console.log("set friend location", state.friendLocation);
    },
    addOrUpdateFriendLocation: (state, action) => {
      const newItem = action.payload;
      const indexToUpdate = state.friendLocation.findIndex(
        (item) => item.userId === newItem.userId
      );
      if (indexToUpdate !== -1) {
        //update if friend is already existed
        state.friendLocation[indexToUpdate].location = newItem.location;
      } else {
        state.friendLocation.push(newItem);
      }
    },
  },
});

export const {
  sendLocation,
  startTracking,
  stopTracking,
  setLocation,
  setFriendLocation,
  removeFriendLocation,
  addOrUpdateFriendLocation,
} = locationSlice.actions;
