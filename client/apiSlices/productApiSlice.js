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
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/updateproduct/${id}`,
        method: "PUT",
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
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addcategory`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `${USERS_URL}/deleteCategory/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateproductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useGetAdminProductsQuery,
  useGetProductDetailsByIdQuery,
  //category
  useGetallcategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = productApiSlice;
