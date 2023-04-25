import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  signOut,
  getAuth,
} from 'firebase/auth';
import { ROUTES } from '../constants';
import { FormRule } from '../types';
import { useAppDispatch } from './';
import { message } from 'antd';
import { setUser, removeUser } from '../store/slices/userSlice';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const signUp = async (value: FormRule) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const data = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      await updateProfile(data.user, { displayName: value.username });
      const accessToken = await data.user.getIdToken();
      dispatch(
        setUser({
          displayName: data.user.displayName,
          email: data.user.email,
          id: data.user.uid,
          token: accessToken,
        })
      );
      navigate(ROUTES.HOME);
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message, 3);
      }
    }
  };

  const signIn = async (values: FormRule) => {
    const auth = getAuth();

    try {
      await setPersistence(auth, browserLocalPersistence);
      const data = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const accessToken = await data.user.getIdToken();
      dispatch(
        setUser({
          displayName: data.user.displayName,
          email: data.user.email,
          id: data.user.uid,
          token: accessToken,
        })
      );
      navigate(ROUTES.HOME);
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message, 3);
      }
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
    } catch (e) {
      console.error(e);
    }
  };

  return { currentUser, signUp, logOut, signIn };
};
