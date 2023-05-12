import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../core/constants';
import { useAuth } from '../hook';
import { Loading } from '../../components';

export const PrivateRoute = () => {
  const { currentUser } = useAuth();

  if (typeof currentUser === 'undefined') return <Loading />;

  return currentUser ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
