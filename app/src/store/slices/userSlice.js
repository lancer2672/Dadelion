import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //set credentials
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      const refToken = action.payload.refreshToken;
      if (refToken) {
        state.refreshToken = refToken;
      }
    },

    update: (state, action) => {
      state.user = action.payload.user;
    },
    loggout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { update, setToken, loggout, setUser } = userSlice.actions;
