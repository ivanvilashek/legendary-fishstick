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
import { ROUTES } from '../../../core/constants';
import { FormRule } from './types';
import { useAppDispatch } from '../reduxHooks';
import { message } from 'antd';
import { setUser, removeUser } from '../../../core/store/slices/userSlice';
import { getTransactions } from '../../../core/store/slices/transactionSlice';

const provider = new GoogleAuthProvider();

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(
        setUser({
          displayName: user?.displayName,
          email: user?.email,
          id: user?.uid,
        })
      );
      dispatch(getTransactions(user?.uid));
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth, dispatch]);

  const signUp = async (value: FormRule) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const data = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      await updateProfile(data.user, { displayName: value.username });
      dispatch(
        setUser({
          displayName: data.user.displayName,
          email: data.user.email,
          id: data.user.uid,
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
      dispatch(
        setUser({
          displayName: data.user.displayName,
          email: data.user.email,
          id: data.user.uid,
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
      dispatch(
        setUser({
          displayName: data.user.displayName,
          email: data.user.email,
          id: data.user.uid,
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
