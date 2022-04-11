import { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const FavoritesLink = () => {
  const auth = useContext(AuthContext);

  return auth.loggedIn ? <Navbar.Brand className="me-auto" as={Link} to="/favorites">Favorites</Navbar.Brand> : null;
};
export default FavoritesLink;
