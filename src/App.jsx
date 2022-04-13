import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage';
import FavoritesPage from './components/FavoritesPage';
import { AuthContext } from './contexts/AuthProvider';
import { addSymbol, updateSymbolInfo } from './slices/tickerSlice';

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

const App = ({ sockets }) => {
  const dispatch = useDispatch();
  sockets.forEach((socket) => {
    // eslint-disable-next-line no-param-reassign
    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed?.event === 'subscribed') {
        dispatch(addSymbol(parsed));
      }
      if (Array.isArray(parsed) && Array.isArray(parsed?.[1])) {
        dispatch(updateSymbolInfo(parsed));
      }
    };
  });

  return (
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
  );
};

export default App;
