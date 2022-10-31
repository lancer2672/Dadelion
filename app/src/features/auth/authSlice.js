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
      const { isAuthenticated,user } = action.payload;
      state = {
        ...state,
        isAuthenticated,
        user,
      };
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
