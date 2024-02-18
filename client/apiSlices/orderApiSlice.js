import { apiSlice } from "./";

const USERS_URL = "api/orders";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createOrder`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
