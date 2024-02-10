import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: "",
  name: "Hello Auth Slice",
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload, " setCredentialssss");
    },

    logOutUser: (state, action) => {
      console.log("logout called");
      state.userInfo = null;
    },
  },
});

export const { setCredentials, logOutUser } = authSlice.actions;

export default authSlice.reducer;
