import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAuth } from '../hook';
import { Loading } from '../components';

export const SpecialRoute = () => {
  const { currentUser } = useAuth();

  return typeof currentUser === 'undefined' ? (
    <Loading />
  ) : currentUser ? (
    <Navigate to={ROUTES.HOME} replace />
  ) : (
    <Outlet />
  );
};
