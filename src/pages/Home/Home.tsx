import { Typography, Space, Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const { Title } = Typography;

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Home';
  }, []);

  const logoutHandler = () => {
    localStorage.setItem('token', 'false');
    navigate(ROUTES.LOGIN);
  };

  return !JSON.parse(localStorage.getItem('token') || 'false') ? (
    <Navigate to={ROUTES.LOGIN} />
  ) : (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Button type="primary" onClick={logoutHandler}>
        Logout
      </Button>
    </Space>
  );
};
