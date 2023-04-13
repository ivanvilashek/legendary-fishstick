import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Typography, Space, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ROUTES } from '../../constants';

const { Title } = Typography;
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Home';

    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => navigate(ROUTES.LOGIN))
      .catch(console.error);
  };

  if (loading) return <Spin indicator={loadingIcon} tip="Loading..." />;

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
