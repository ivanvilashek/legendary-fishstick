import { Avatar } from 'antd';
import { Props } from './types';
import { getCategoryObj } from 'shared/helpers';

export const CategoryIcon = ({ category, type, size = 35 }: Props) => {
  const selected = getCategoryObj(category, type);

  return (
    <Avatar
      size={size}
      icon={selected?.icon}
      style={{ background: selected?.color }}
    />
  );
};
