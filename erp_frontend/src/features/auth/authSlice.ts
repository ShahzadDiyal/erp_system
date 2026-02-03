// src/features/auth/authSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type Permission = {
  id: number;
  permission_name: string;
  module_name: string;
};

type Role = {
  id: number;
  role_name: string;
  permissions: Permission[];
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  isSuperAdmin?: boolean;
};

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
  userType: 'employee' | 'admin' | null;
}

// Check both storage locations
const getInitialAuthState = (): AuthState => {
  const erpAuth = localStorage.getItem('erp_auth');
  const employeeAuth = localStorage.getItem('employee_auth');

  if (erpAuth) {
    const parsed = JSON.parse(erpAuth);
    return {
      ...parsed,
      userType: 'admin',
      isLoading: false
    };
  }

  if (employeeAuth) {
    const parsed = JSON.parse(employeeAuth);
    return {
      ...parsed,
      userType: 'employee',
      isLoading: false
    };
  }

  return {
    token: null,
    user: null,
    isLoading: false,
    userType: null
  };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; user: AuthUser; userType: 'employee' | 'admin' }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.isLoading = false;

      // Store in appropriate localStorage
      if (action.payload.userType === 'admin') {
        localStorage.setItem('erp_auth', JSON.stringify({
          token: state.token,
          user: state.user
        }));
        localStorage.removeItem('employee_auth'); // Clear employee auth
      } else {
        localStorage.setItem('employee_auth', JSON.stringify({
          token: state.token,
          user: state.user
        }));
        localStorage.removeItem('erp_auth'); // Clear admin auth
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.userType = null;
      state.isLoading = false;
      localStorage.removeItem('erp_auth');
      localStorage.removeItem('employee_auth');
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  },
});

export const { setAuth, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;