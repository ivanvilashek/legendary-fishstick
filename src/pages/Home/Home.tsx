import { Typography, Space, Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const { Title } = Typography;

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('token') || 'false')) {
      navigate(ROUTES.LOGIN);
    }
    document.title = 'Home';
  }, []);

  const logoutHandler = () => {
    localStorage.setItem('token', 'false');
    navigate(ROUTES.LOGIN);
  };

  return (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Button type="primary" onClick={logoutHandler}>
        Logout
      </Button>
    </Space>
  );
};
