import { Transaction } from 'core/store/slices/transactionSlice';

export const getTotal = (transactions: Transaction[]) => {
  return transactions.reduce((acc, item) => (acc += item.data.amount), 0);
};
