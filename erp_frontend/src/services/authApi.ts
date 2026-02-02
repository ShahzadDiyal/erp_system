import { api } from './api';

export type LoginReq = 
{ email: string; password: string };

export type Permission = {
  id: number;
  permission_name: string;
  module_name: string;
};

export type Role = {
  id: number;
  role_name: string;
  permissions: Permission[];
};


export type LoginRes = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: Role;
      isSuperAdmin?: boolean;
    };
  };
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginRes, LoginReq>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
    }),
  }),
});


export const { useLoginMutation } = authApi;
