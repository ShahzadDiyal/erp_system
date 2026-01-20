import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { api } from '../services/api';
import inventoryReducer from '../features/inventory/inventorySlice'; // Add this import


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
         inventory: inventoryReducer,
    },
      middleware: (getDefault) => getDefault().concat(api.middleware),

    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;