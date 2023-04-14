import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAuth } from '../hook';
import { Loading } from '../components';

export const PrivateRoute = () => {
  const user = useAuth();

  return typeof user === 'undefined' ? (
    <Loading />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};
