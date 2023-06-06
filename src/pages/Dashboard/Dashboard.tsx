import { filterTransactions } from 'shared/helpers';
import { useAppSelector } from 'shared/hook';
import { Graph } from 'components';

export const Dashboard = () => {
  const transactions = useAppSelector((state) => state.transactions);
  const expenses = filterTransactions(transactions, 'expense');

  return (
    <>
      <Graph data={expenses} />
    </>
  );
};
