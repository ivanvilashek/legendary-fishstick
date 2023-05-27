import { Avatar } from 'antd';
import { Props } from './types';

export const FieldIcon = ({ icon, value, children, size = 35 }: Props) => {
  return (
    <Avatar size={size} icon={icon} style={{ background: value && '#1677FF' }}>
      {children}
    </Avatar>
  );
};
