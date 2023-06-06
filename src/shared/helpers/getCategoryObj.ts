import { categories, Category } from 'components/TransactionModal/constants';

export const getCategoryObj = (category: string, type: string) => {
  return categories[type].find(
    (item: { value: string }) => item.value === category
  ) as Category;
};
