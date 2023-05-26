import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Transaction } from 'core/store/slices/transactionSlice';
import { initialState } from './constants';

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Transaction | null>) {
      state.modal = {
        isOpen: true,
        transaction: action.payload,
      };
    },

    closeModal(state) {
      state.modal = {
        isOpen: false,
        transaction: null,
      };
    },
  },
});

export const { openModal, closeModal } = UISlice.actions;

export default UISlice.reducer;
