import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LoginButton from './LoginButton';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user } = useAuth();
  const setStyle = ({ isActive }) => (isActive ? { color: '#0dcaf0' } : { color: '#6c757d' });
  return (
    <Navbar variant="light" bg="light" expand="lg" className="shadow-sm">
      <Nav.Link as={NavLink} to="/" style={setStyle} className="p-2">Home</Nav.Link>
      {user && <Nav.Link as={NavLink} to="/favorites" style={setStyle} className="p-2">Favorites</Nav.Link>}
      <LoginButton />
    </Navbar>
  );
};

export default NavBar;
