import { apiSlice } from "./";

const USERS_URL = "api/product";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createproduct: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createproduct`,
        method: "POST",
        body: data,
      }),
    }),
    getAllProducts: builder.query({
      query: (queryArg) => {
        const params = new URLSearchParams(queryArg).toString();
        return {
          url: `/getAllProducts?${params}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.products,
    }),
    getAdminProducts: builder.query({
      query: () => {
        return {
          url: `/getAdminproducts`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.products,
    }),
  }),
});

export const {
  useCreateproductMutation,
  useGetAllProductsQuery,
  useGetAdminProductsQuery,
} = userApiSlice;
