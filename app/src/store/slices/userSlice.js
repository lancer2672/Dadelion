import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Voximplant } from "react-native-voximplant";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,

  registrationForm: null,
};
export const logoutUser = createAsyncThunk("user/logout", async () => {
  await AsyncStorage.multiRemove([
    "userId",
    "token",
    "refreshToken",
    "username",
    "tokenVoximplant",
  ]);
  await Voximplant.getInstance().disconnect();
});

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
    updateUserState: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    });
  },
});

export const { updateUserState, setToken, setUser } = userSlice.actions;
