import { Transaction } from 'core/store/slices/transactionSlice';

export const filterTransactions = (
  transactions: Transaction[],
  type?: 'expense' | 'income'
) => {
  if (!type) return transactions;
  return transactions.filter((item) => item.data.type === type);
};
