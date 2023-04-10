import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, NotFound } from './pages';
import { ROUTES } from './constants';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          Component={() => <h1 style={{ textAlign: 'center' }}>Home Page</h1>}
        />
        <Route path={ROUTES.LOGIN} Component={() => <Login />} />
        <Route path={ROUTES.NOT_FOUND} Component={() => <NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
