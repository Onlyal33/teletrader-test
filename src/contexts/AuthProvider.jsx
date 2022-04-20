import { useState, useMemo, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const logIn = () => {
    const fakeUserId = 'fakeUserId';
    localStorage.setItem('userId', fakeUserId);
    setLoggedIn(true);
  };

  const authData = useMemo(() => ({
    loggedIn, logIn,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};
