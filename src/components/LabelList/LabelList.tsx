import { Label } from 'components';
import { getSumByCategories } from 'shared/helpers';
import { Props } from './types';
import styles from './LabelList.module.scss';

export const LabelList = ({ transactions }: Props) => {
  const data = getSumByCategories(transactions).sort(
    (a, b) => b.total - a.total
  );
  const rendered = data.slice(0, 4);
  const hidden = data.slice(4);
  const hiddenCount = hidden.length;
  const hiddenTotal = hidden.reduce((acc, item) => (acc += item.total), 0);

  return (
    <div className={styles.LabelList}>
      {rendered.map((item, i) => (
        <Label
          key={i}
          category={item.category}
          total={item.total}
          color={item.color}
        />
      ))}
      {hiddenCount > 0 && (
        <Label
          category={`${hiddenCount} more`}
          total={hiddenTotal}
          color="#FFC300"
        />
      )}
    </div>
  );
};
