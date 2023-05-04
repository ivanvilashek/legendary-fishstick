import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  signOut,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { ROUTES } from '../constants';
import { FormRule } from '../types';
import { useAppDispatch } from './';
import { message } from 'antd';
import { setUser, removeUser } from '../store/slices/userSlice';

const provider = new GoogleAuthProvider();

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
  }, [auth]);

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

  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
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

  return { currentUser, signUp, logOut, signIn, signInWithGoogle };
};
