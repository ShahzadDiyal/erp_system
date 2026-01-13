import type  { PayloadAction } from '@reduxjs/toolkit';
import  { createSlice } from '@reduxjs/toolkit';


type UserRole = 'admin' | 'manager' | 'cashier' | 'warehouse';

interface AuthState {
    token: string | null,
    user: { id: number; name: string, role: UserRole } | null;
}

const initialState: AuthState = {
    token: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) {
            state.token = action.payload.token;
            state.user = action.payload.user
        },
        logout(state) {
            state.token = null;
            state.user = null
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;