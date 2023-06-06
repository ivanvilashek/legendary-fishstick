import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { chartData, getTotal } from 'shared/helpers';
import { LabelList } from 'components';
import { Card } from 'antd';
import { Props } from './types';
import styles from './Graph.module.scss';

Chart.register(ArcElement);

export const Graph = ({ data }: Props) => {
  const config = chartData(data);
  const total = getTotal(data);

  return (
    <Card title="Top expense categories">
      <div className={styles.Graph}>
        <div className={styles.Doughnut}>
          <Doughnut {...config} />
          <h3>
            Total expenses<span>{total}</span>
          </h3>
        </div>

        <div>
          <LabelList transactions={data} />
        </div>
      </div>
    </Card>
  );
};
