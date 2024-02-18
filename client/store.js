import { configureStore } from "@reduxjs/toolkit";
//reducers
import { apiSlice } from "./apiSlices/index";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/ordersSlice";

const store = configureStore({
  reducer: {
    authReducer,
    orderReducer,
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
