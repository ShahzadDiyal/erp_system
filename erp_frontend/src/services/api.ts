import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);

      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      headers.set('ngrok-skip-browser-warning', 'true');
      return headers;
    },
  }),
  tagTypes: ['Roles', 'Branches', 'Permissions', 'Staff','Products'], // Add tag types
  endpoints: () => ({
    // You can add common endpoints here, or keep it empty
    // SuperAdmin endpoints will be injected
  }),
});

// Export hooks for any endpoints defined in api.ts
// export const { } = api;