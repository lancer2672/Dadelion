import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      console.log("state.data", action.payload);
    },
    update: (state, action) => {
      state.user = action.payload.user;
      console.log("state.data", state.user);
    },
    loggout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { update, loggout, setUser } = userSlice.actions;
