import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAuth } from '../hook';
import { Loading } from '../components';

export const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return typeof currentUser === 'undefined' ? (
    <Loading />
  ) : currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};
