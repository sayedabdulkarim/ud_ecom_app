import { apiSlice } from "./";

const USERS_URL = "api/product";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createproduct: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createproduct`,
        method: "POST",
        body: data,
      }),
    }),
    // getAllProducts: builder.query({
    //   query: (queryArg) => {
    //     const params = new URLSearchParams(queryArg).toString();
    //     return {
    //       url: `${USERS_URL}/getAllProducts/?${params}`,
    //       method: "GET",
    //     };
    //   },
    // }),
    getAllProducts: builder.query({
      query: (queryArg) => {
        const params = new URLSearchParams(queryArg).toString();
        return {
          url: `${USERS_URL}/getAllProducts/?${params}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0, // Data is considered stale immediately
      refetchOnMountOrArgChange: true, // Refetch on every mount or argument change
    }),
    getProductDetailsById: builder.query({
      query: (id) => {
        return {
          url: `${USERS_URL}/getProduct/${id}`,
          method: "GET",
        };
      },
    }),
    getAdminProducts: builder.query({
      query: () => {
        return {
          url: `${USERS_URL}/getAdminproducts`,
          method: "GET",
        };
      },
    }),
    getallcategories: builder.query({
      query: () => {
        return {
          url: `${USERS_URL}/getallcategories`,
          method: "GET",
        };
      },
    }),
    addcategory: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addcategory`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateproductMutation,
  useGetAllProductsQuery,
  useGetAdminProductsQuery,
  useGetProductDetailsByIdQuery,
  //category
  useGetallcategoriesQuery,
  useAddcategoryMutation,
} = productApiSlice;
