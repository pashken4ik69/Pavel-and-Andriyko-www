import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      headers.set(`Authorization`, `Bearer ${token}`)
    }
    return headers
  }
})

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["Users", "Spaces", "Bokkings", "Reviews"],
  baseQuery,
  endpoints: () => ({})
})