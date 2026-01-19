import { api } from './api';

export type LoginReq = { email: string; password: string };
export type LoginRes = {
  success: boolean;
  message: string;
   data: {
    token: string;
    user: { 
      id: number; 
      name: string; 
      email: string; 
      roles: string[];
      permissions: string[];
      isSuperAdmin?: boolean;
    };
  };
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginRes, LoginReq>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
  }),
});


export const { useLoginMutation } = authApi;
