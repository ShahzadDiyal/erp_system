import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import posReducer from '../features/pos/posSlice';
import { api } from '../services/api';
import { inventoryApi } from '../services/inventoryApi'; // Import inventoryApi
import inventoryReducer from '../features/inventory/inventorySlice';
import salesReducer from '../features/sales/salesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [inventoryApi.reducerPath]: inventoryApi.reducer, // Add this
        inventory: inventoryReducer,
        pos: posReducer,
        sales: salesReducer,
    },
    middleware: (getDefault) => 
        getDefault().concat(
            api.middleware,
            inventoryApi.middleware // Add this too
        ),
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;