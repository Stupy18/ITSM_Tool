import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// @ts-ignore
import { LocalStorageEnum } from "../enum/LocalStorageEnum.tsx";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
     baseUrl: "/",
     prepareHeaders: (headers) => {
      const token = localStorage.getItem(LocalStorageEnum.JWT_TOKEN);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

