import { Avatar } from 'antd';

interface PropsType {
  value: any;
  icon?: JSX.Element;
  children?: JSX.Element | string;
}

export const FieldIcon = ({ icon, value, children }: PropsType) => {
  return (
    <Avatar size={35} icon={icon} style={{ background: value && '#1677FF' }}>
      {children}
    </Avatar>
  );
};
