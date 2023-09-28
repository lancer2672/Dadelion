import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
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
  },
});

export const { sendLocation, startTracking, stopTracking, setLocation } =
  locationSlice.actions;
