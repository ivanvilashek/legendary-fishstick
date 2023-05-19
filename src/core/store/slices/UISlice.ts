import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StateValue, TransactionValue } from './transactionSlice';

interface StateType {
  modal: {
    isOpen: boolean;
    transaction?: StateValue | null;
  };
}

const initialState: StateType = {
  modal: {
    isOpen: false,
    transaction: null,
  },
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<StateValue | null>) {
      console.log(action);
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
