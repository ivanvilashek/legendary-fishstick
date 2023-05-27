import { Avatar } from 'antd';
import { categories } from 'components/TransactionModal/constants';
import { Props } from './types';

export const CategoryIcon = ({ category, type }: Props) => {
  const selected = categories[type].find(
    (item: { value: string }) => item.value === category
  );
  return (
    <Avatar
      size={35}
      icon={selected?.icon}
      style={{ background: selected?.color }}
    />
  );
};
