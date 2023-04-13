import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Register, NotFound } from './pages';
import { ROUTES } from './constants';

const AppRouter = (props: { isSignIn: boolean }) => {
  const { isSignIn } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          Component={() => (isSignIn ? <Home /> : <Login />)}
        />
        <Route
          path={ROUTES.LOGIN}
          Component={() => (isSignIn ? <Home /> : <Login />)}
        />
        <Route path={ROUTES.REGISTER} Component={() => <Register />} />
        <Route path={ROUTES.NOT_FOUND} Component={() => <NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
