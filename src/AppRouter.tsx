import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Register, NotFound } from './pages';
import { ROUTES } from './constants';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} Component={() => <Home />} />
        <Route path={ROUTES.LOGIN} Component={() => <Login />} />
        <Route path={ROUTES.REGISTER} Component={() => <Register />} />
        <Route path={ROUTES.NOT_FOUND} Component={() => <NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
