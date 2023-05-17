import { createSlice } from '@reduxjs/toolkit';
import { StateValue } from './transactionSlice';

interface StateType {
  modal: {
    action: number | null;
    transaction: StateValue | null;
  };
}

const initialState: StateType = {
  modal: {
    action: null,
    transaction: null,
  },
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openModal(state, action) {
      state.modal = {
        action: action.payload.action,
        transaction: action.payload.transaction,
      };
    },

    closeModal(state) {
      state.modal = {
        action: null,
        transaction: null,
      };
    },
  },
});

export const { openModal, closeModal } = UISlice.actions;

export default UISlice.reducer;
