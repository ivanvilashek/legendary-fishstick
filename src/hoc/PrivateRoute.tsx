import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ROUTES } from '../constants';
import { useAuth } from '../hook';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const PrivateRoute = () => {
  const user = useAuth();

  return typeof user === 'undefined' ? (
    <Spin indicator={loadingIcon} tip="Loading..." />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};
