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
    processPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/processPayment`,
        method: "POST",
        body: data,
      }),
    }),
    getAllOrders: builder.query({
      query: () => {
        return {
          url: `${USERS_URL}/getAllOrders`,
          method: "GET",
        };
      },
    }),
    updateOrderStatus: builder.query({
      query: (orderid) => {
        return {
          url: `${USERS_URL}/updateOrderStatus${orderid}`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useProcessPaymentMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusQuery,
} = orderApiSlice;
