import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'core/constants';
import { useAuth } from 'shared/hook';
import { Loading } from 'components';

export const SpecialRoute = () => {
  const { currentUser } = useAuth();

  if (typeof currentUser === 'undefined') return <Loading />;

  return currentUser ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};
