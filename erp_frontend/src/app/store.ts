import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import posReducer from '../features/pos/posSlice';
import { api } from '../services/api';
import inventoryReducer from '../features/inventory/inventorySlice'; // Add this import
import salesReducer from '../features/sales/salesSlice'; // Add this import


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer,
         inventory: inventoryReducer,
          pos: posReducer,
          sales: salesReducer,
    },
      middleware: (getDefault) => getDefault().concat(api.middleware),

    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;