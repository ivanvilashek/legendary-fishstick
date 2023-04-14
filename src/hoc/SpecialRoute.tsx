import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAuth } from '../hook';
import { Loading } from '../components';

export const SpecialRoute = () => {
  const user = useAuth();

  return typeof user === 'undefined' ? (
    <Loading />
  ) : user ? (
    <Navigate to={ROUTES.HOME} replace />
  ) : (
    <Outlet />
  );
};
