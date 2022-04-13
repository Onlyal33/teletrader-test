import {
  useContext,
} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
  NavLink,
} from 'react-router-dom';
import LoginButton from './LoginButton';
import { AuthContext } from '../contexts/AuthProvider';

const NavBar = () => {
  const auth = useContext(AuthContext);
  const setStyle = ({ isActive }) => (isActive ? { color: '#0dcaf0' } : { color: '#6c757d' });
  return (
    <Navbar variant="light" bg="light" expand="lg" className="shadow-sm">
      <Nav.Link as={NavLink} to="/" style={setStyle}>Home</Nav.Link>
      {auth.loggedIn ? <Nav.Link as={NavLink} to="/favorites" style={setStyle} className="me-auto">Favorites</Nav.Link> : null}
      <LoginButton />
    </Navbar>
  );
};

export default NavBar;
