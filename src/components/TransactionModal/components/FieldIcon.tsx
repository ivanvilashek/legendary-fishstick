import { Avatar } from 'antd';

type Props = {
  value: any;
  size?: number;
  icon?: JSX.Element;
  children?: JSX.Element | string;
};

export const FieldIcon = ({ icon, value, children, size = 35 }: Props) => {
  return (
    <Avatar size={size} icon={icon} style={{ background: value && '#1677FF' }}>
      {children}
    </Avatar>
  );
};
