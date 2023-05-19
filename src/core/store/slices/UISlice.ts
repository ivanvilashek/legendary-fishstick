import { createSlice } from '@reduxjs/toolkit';
import { StateValue } from './transactionSlice';

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
    openModal(state, action) {
      console.log(action);
      state.modal = {
        isOpen: true,
        transaction: action.payload ? action.payload : null,
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
