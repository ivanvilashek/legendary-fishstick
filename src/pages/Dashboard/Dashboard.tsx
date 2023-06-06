import { getSumByCategories } from 'shared/helpers';
import { useAppSelector } from 'shared/hook';
import { Graph } from 'components';

export const Dashboard = () => {
  const transactions = useAppSelector((state) => state.transactions);
  const expenses = transactions.filter((item) => item.data.type === 'expense');

  const sumByCategory = getSumByCategories(expenses);

  console.log(sumByCategory);
  return (
    <>
      <Graph data={expenses} />
    </>
  );
};
