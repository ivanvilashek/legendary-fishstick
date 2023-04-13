import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAuth } from '../hook';

export const SpecialRoute = () => {
  const user = useAuth();

  return user ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};
