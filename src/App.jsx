import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import './App.css';
import HomePage from './features/HomePage';
import DetailsPage from './features/DetailsPage';
import FavoritesPage from './features/FavoritesPage';
import LoginButton from './features/LoginButton';

const RequireAuth = ({ children }) => {
  const auth = { loggedIn: true }; // useContext(AuthContext);
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
  <Router>
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
            <Navbar.Brand as={Link} to="/details">details</Navbar.Brand>
            <Navbar.Brand as={Link} to="/favorites">favorites</Navbar.Brand>
            <LoginButton />
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
/*
    <div className="App">
      <Navbar bg="light">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#favorites">Favorites</Nav.Link>
        <Nav.Link href="#login">Login</Nav.Link>
      </Nav>
      </Navbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
);

export default App;
