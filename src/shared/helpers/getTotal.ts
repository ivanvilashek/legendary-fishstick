import { Transaction } from 'core/store/slices/transactionSlice';
import { filterTransactions } from './filterTransactions';

export const getTotal = (
  transactions: Transaction[],
  type?: 'expense' | 'income'
) => {
  const filtered = filterTransactions(transactions, type);
  return filtered.reduce((acc, item) => (acc += item.data.amount), 0);
};
