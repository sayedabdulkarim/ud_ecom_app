import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOutUser } from "../slices/authSlice";
const getJwtToken = () => {
  return "";
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.225.131:5000/",
    credentials: "include", // Necessary for cookies to be included
    prepareHeaders: (headers) => {
      const token = getJwtToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // Check for 401 Unauthorized response
  if (result.error && result.error.status === 401) {
    // Perform logout operations
    api.dispatch(logOutUser());
    // window.location.href = "/auth";
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
