import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentCall: null,
};

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    //set credentials
    setCall: (state, action) => {
      state.currentCall = action.payload;
      console.log("state.currentCall", state.currentCall);
    },
    removeCall: (state, action) => {
      state.currentCall = null;
    },
  },
});

export const { setCall, removeCall } = callSlice.actions;
