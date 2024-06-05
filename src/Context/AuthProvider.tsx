import React, { useEffect } from "react";
import { auth } from "../firebase";
import {
  clearCurrentUser,
  setCurrentUserInState,
} from "../store/modules/authModule";
import { useAppDispatch } from "../store/rootReducer";

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCurrentUserInState({ userPayload: user }));
      } else {
        dispatch(clearCurrentUser());
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};
