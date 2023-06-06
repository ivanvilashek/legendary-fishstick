import { categories } from 'components/TransactionModal/constants';

export const getCategoryType = (category: string) => {
  return Object.keys(categories).find((key) =>
    categories[key].some((item) => item.value === category)
  ) as string;
};
