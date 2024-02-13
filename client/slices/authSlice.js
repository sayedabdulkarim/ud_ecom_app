import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  name: "Hello Auth Slice",
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      console.log(
        {
          payload: action.payload,
        },
        " payload"
      );

      state.userInfo = action.payload;
      AsyncStorage.setItem("@auth_token", token).catch(console.error);
      state.isAuthenticated = !!token;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    logOutUser: (state, action) => {
      console.log("logout called");
      AsyncStorage.removeItem("@auth_token").catch(console.error);
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setAuthenticated, logOutUser } =
  authSlice.actions;

export default authSlice.reducer;
