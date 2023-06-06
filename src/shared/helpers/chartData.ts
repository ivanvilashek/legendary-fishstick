import { Transaction } from 'core/store/slices/transactionSlice';
import { getSumByCategories } from 'shared/helpers';

export const chartData = (data: Transaction[]) => {
  const sumByCategories = data.length
    ? getSumByCategories(data)
    : [{ total: 1, color: '#bfbfbf' }];

  return {
    data: {
      datasets: [
        {
          data: sumByCategories.map((item) => item.total),
          backgroundColor: sumByCategories.map((item) => item.color),
          hoverOffset: 4,
          borderRadius: 20,
        },
      ],
    },
    options: {
      cutout: '85%',
    },
  };
};
