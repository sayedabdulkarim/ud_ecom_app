import { apiSlice } from "./";

const USERS_URL = "api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/profile`,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: body,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
    changepassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/changepassword`,
        method: "PUT",
        body: data,
      }),
    }),
    updateprofilepic: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateprofilepic`,
        method: "PUT",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotpassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetpassword`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useLogoutMutation,
  useChangepasswordMutation,
  useUpdateprofilepicMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApiSlice;
