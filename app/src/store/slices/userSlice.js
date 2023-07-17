import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  errorMessage: "",
  pending: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action) => {
      state.data = action.payload.user;
    },
    remove: (state) => {
      state.data = null;
    },
  },
});

export const { update, remove } = userSlice.actions;
