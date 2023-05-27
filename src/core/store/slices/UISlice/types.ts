import { Transaction } from 'core/store/slices/transactionSlice';

export type UIState = {
  modal: {
    isOpen: boolean;
    transaction: Transaction | null;
  };
};
