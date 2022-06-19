import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const LoginButton = () => {
  const { user, logIn, logOut } = useAuth();

  return (
    <Button
      variant="info"
      className="ms-auto me-2 text-white"
      onClick={user ? logOut : logIn}
    >
      {user ? 'Log Out' : 'Log In'}
    </Button>
  );
};
export default LoginButton;
