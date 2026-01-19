import type  { PayloadAction } from '@reduxjs/toolkit';
import  { createSlice } from '@reduxjs/toolkit';

type AuthUser = { 
  id: number; 
  name: string; 
  email: string; 
  roles: string[];
  permissions: string[];
  isSuperAdmin?: boolean;
};

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isLoading: boolean;
}


const saved = localStorage.getItem('erp_auth');
const initialState: AuthState = saved ? JSON.parse(saved) : {
  token: null,
  user: null,
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoading = false;
      localStorage.setItem('erp_auth', JSON.stringify({ 
        token: state.token, 
        user: state.user 
      }));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isLoading = false;
      localStorage.removeItem('erp_auth');
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  },
});


export const { setAuth, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;