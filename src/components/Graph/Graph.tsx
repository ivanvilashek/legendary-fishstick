import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { Transaction } from 'core/store/slices/transactionSlice';
import { chartData, getTotal } from 'shared/helpers';
import styles from './Graph.module.scss';
import { LabelList } from 'components';
import { Card } from 'antd';

Chart.register(ArcElement);

export const Graph = ({ data }: { data: Transaction[] }) => {
  const config = chartData(data);
  const total = getTotal(data, 'expense');

  return (
    <Card title="Top expense categories">
      <div className={styles.Graph}>
        <div className={styles.Doughnut}>
          <Doughnut {...config} />
          <h3>
            Total expenses<p style={{ textAlign: 'center' }}>{total}</p>
          </h3>
        </div>

        <div>
          <LabelList transactions={data} />
        </div>
      </div>
    </Card>
  );
};
