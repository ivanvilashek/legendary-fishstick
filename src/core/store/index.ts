import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import transactionReducer from './slices/transactionSlice';
import UIReducer from './slices/UISlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    UI: UIReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
