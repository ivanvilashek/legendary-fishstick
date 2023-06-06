import styles from './Label.module.scss';
import { TotalByCategory } from 'shared/helpers';
import { Props } from './types';

export const Label = ({ category, color, total }: Props) => {
  return (
    <div className={styles.Label}>
      <div>
        <div style={{ backgroundColor: `${color}` }}></div>
        <p>{category}</p>
      </div>
      <p>{total}</p>
    </div>
  );
};
