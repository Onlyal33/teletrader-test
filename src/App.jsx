import { useState, useContext, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import HomePage from './features/HomePage';
import DetailsPage from './features/DetailsPage';
import FavoritesPage from './features/FavoritesPage';
import LoginButton from './features/LoginButton';
import FavoritesLink from './features/FavoritesLink';
import AuthContext from './contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
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

const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    !auth.loggedIn ? (
      <Navigate to="/" state={{ from: location }} replace />
    ) : (
      children
    ));
};

const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <h3>
        404
        {' '}
        <code>{location.pathname}</code>
        {' '}
        not found
      </h3>
    </div>
  );
};

// eslint-disable-next-line arrow-body-style
const App = ({ symbols }) => {
  return (
    <AuthProvider>
      <Router>
        <div className="h-100">
          <div className="d-flex flex-column h-100">
            <Navbar bg="light" expand="lg" className="shadow-sm">
              <Container>
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <FavoritesLink />
                <LoginButton />
              </Container>
            </Navbar>
            <Routes>
              <Route path="/" element={<HomePage symbols={symbols} />} />
              <Route path="/details" element={<DetailsPage />} />
              <Route
                path="/favorites"
                element={(
                  <RequireAuth>
                    <FavoritesPage />
                  </RequireAuth>
          )}
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
