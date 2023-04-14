import { Typography, Space, Button } from 'antd';
import { useAuth } from '../../hook';

const { Title } = Typography;

export const Home = () => {
  const user = useAuth();

  return (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Title level={2}>{user?.displayName}</Title>
    </Space>
  );
};
