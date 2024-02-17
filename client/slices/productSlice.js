import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, data } = action.payload;
      console.log(
        {
          payload: action.payload,
        },
        " payload"
      );

      state.userInfo = action.payload;
      AsyncStorage.setItem("@auth_token", token).catch(console.error);
      AsyncStorage.setItem("@user_details", JSON.stringify(data)).catch(
        console.error
      );
      state.isAuthenticated = !!token;
    },
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
