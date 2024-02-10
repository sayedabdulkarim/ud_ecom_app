import { configureStore } from "@reduxjs/toolkit";
//reducers
import { apiSlice } from "./apiSlices/index";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],

  devTools: true,
});

// console.log(apiSlice, " appppp");
export default store;
