import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthProvider';

const LoginButton = () => {
  const auth = useContext(AuthContext);

  return !auth.loggedIn ? (<Button variant="info" className="ms-auto me-2 text-white" onClick={auth.logIn}>Log in</Button>) : null;
};
export default LoginButton;
