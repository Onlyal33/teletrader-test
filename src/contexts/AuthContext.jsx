import {
  useState, useMemo, createContext, useContext,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('userId') || null);

  const logIn = () => {
    const fakeUserId = 'fakeUserId';
    localStorage.setItem('userId', fakeUserId);
    setUser(fakeUserId);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const authData = useMemo(() => ({
    user,
    logIn,
    logOut,
  }), [user]);

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
