import { Typography, Space } from 'antd';
import { NewTransaction } from '../../components';
import { useAppSelector } from '../../hook';

const { Title } = Typography;

export const Home = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Title level={2}>{user.displayName}</Title>
      <NewTransaction />
    </Space>
  );
};
