import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import { AuthProvider, AuthContext } from './contexts/AuthProvider';

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

const App = () => (
  <AuthProvider>
    <Router>
      <div className="h-100">
        <div className="d-flex flex-column">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:pair" element={<DetailsPage />} />
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

export default App;
