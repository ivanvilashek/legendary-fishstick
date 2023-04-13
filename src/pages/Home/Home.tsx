import { getAuth, signOut } from 'firebase/auth';
import { Typography, Space, Button } from 'antd';
import { useAuth } from '../../hook';

const { Title } = Typography;

export const Home = () => {
  const auth = getAuth();
  const user = useAuth();

  const logoutHandler = () => {
    signOut(auth).catch(console.error);
  };

  return (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Title level={2}>{user?.displayName}</Title>
      <Button type="primary" onClick={logoutHandler}>
        Logout
      </Button>
    </Space>
  );
};
