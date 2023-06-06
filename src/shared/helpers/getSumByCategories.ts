import { Transaction } from 'core/store/slices/transactionSlice';
import { TotalByCategory } from './types';
import { getCategoryType, getCategoryObj } from 'shared/helpers';

export const getSumByCategories = (transactions: Transaction[]) => {
  return transactions.reduce((accumulator, transaction) => {
    const { category, amount } = transaction.data;

    const existCategory = accumulator.find(
      (item) => item.category === category
    );

    if (existCategory) {
      existCategory.total += amount;
    } else {
      const categoryType = getCategoryType(category);
      const matchingCategory = getCategoryObj(category, categoryType);

      accumulator.push({
        category,
        total: amount,
        color: matchingCategory.color,
      });
    }

    return accumulator;
  }, [] as TotalByCategory[]);
};
