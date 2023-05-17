import { Avatar } from 'antd';
import { categories } from 'components/TransactionModal/constants';

interface PropsType {
  category: string;
  type: string;
}

export const CategoryIcon = ({ category, type }: PropsType) => {
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
