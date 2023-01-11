import {
  useState, useMemo, createContext, useContext, useCallback,
} from 'react';

const AuthContext = createContext();

const getInitialLoginState = () => localStorage.getItem('userId') || null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialLoginState);

  const logIn = useCallback(() => {
    const fakeUserId = 'fakeUserId';
    localStorage.setItem('userId', fakeUserId);
    setUser(fakeUserId);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  const authData = useMemo(() => ({
    user,
    logIn,
    logOut,
  }), [user, logIn, logOut]);

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
