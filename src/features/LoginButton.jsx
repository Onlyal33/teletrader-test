import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';

const LoginButton = () => {
  const auth = useContext(AuthContext);

  return !auth.loggedIn ? (<Button className="ms-auto" onClick={auth.logIn}>Log in</Button>) : null;
};
export default LoginButton;
