import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "@src/api/auth";
import { getSocket } from "@src/utils/socket";

const initialState = {
  user: null,
  registrationForm: null,
};
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const socket = getSocket();
    await AsyncStorage.multiRemove(["userId", "token", "username"]);

    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    socket.emit("stop-tracking");
    await authApi.logout();
  } catch (er) {
    console.log("Logout error", er);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //set credentials
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserState: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { updateUserState, setUser } = userSlice.actions;
