import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, NotFound } from './pages';
import { ROUTES } from './constants';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.home}
          Component={() => <h1 style={{ textAlign: 'center' }}>Home Page</h1>}
        />
        <Route path={ROUTES.login} Component={() => <Login />} />
        <Route path={ROUTES.notFound} Component={() => <NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
