import AppRouter from './AppRouter';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    });
  }, []);

  return <AppRouter isSignIn={isSignIn} />;
}

export default App;
