import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOutUser } from "../slices/authSlice";

const getJwtToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    console.log({ token }, " fro, api slice");
    return token || "";
  } catch (e) {
    console.error("Failed to fetch token:", e);
    return "";
  }
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.225.131:5000/",
    credentials: "include",
    prepareHeaders: async (headers, { getState }) => {
      const token = await getJwtToken(); // Now this is async
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Perform logout operations
    api.dispatch(logOutUser());
    // Note: Redirect to login should be handled in your components, not here
  }

  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
