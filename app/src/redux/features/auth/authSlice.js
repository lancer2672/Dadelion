import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authLoading:false,
  isAuthenticated:false,
  user:null,
  value:0,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  //passed to createReducer
  reducers: {
    setAuth: (state, action) => {
      const {isAuthenticated} = action.payload
      console.log("before", state);
      state = {
        ...state,
        isAuthenticated
      }
      console.log("after", state);

    },
    increment: (state) => {
      state.value -= 1
    },
    // increment1: (state, action) => {
    //   state.value -= 1
    //   console.log(action.payload);
    // },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth, increment} = authSlice.actions

export default authSlice.reducer