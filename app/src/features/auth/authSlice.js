import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authLoading: false,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  //passed to createReducer
  reducers: {
    setAuth: (state, action) => {
      const { isAuthenticated } = action.payload;
      state = {
        ...state,
        isAuthenticated,
      };
    },
    // increment1: (state, action) => {
    //   state.value -= 1
    //   console.log(action.payload);
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, increment } = authSlice.actions;

export default authSlice.reducer;
