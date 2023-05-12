import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Settings,
  Dashboard,
  Currency,
  NotFound,
} from './pages';
import { PrivateRoute, SpecialRoute } from './shared/hoc';
import { ROUTES } from './core/constants';
import { PageLayout } from './shared/layout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<PageLayout />}>
            <Route path={ROUTES.HOME} Component={() => <Home />} />
            <Route path={ROUTES.DASHBOARD} Component={() => <Dashboard />} />
            <Route path={ROUTES.CURRENCY} Component={() => <Currency />} />
            <Route path={ROUTES.SETTINGS} Component={() => <Settings />} />
          </Route>
        </Route>

        <Route element={<SpecialRoute />}>
          <Route path={ROUTES.LOGIN} Component={() => <Login />} />
          <Route path={ROUTES.REGISTER} Component={() => <Register />} />
        </Route>

        <Route path={ROUTES.NOT_FOUND} Component={() => <NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
