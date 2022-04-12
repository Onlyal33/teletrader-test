import axios from 'axios';
import App from './App';
import routes from './common/routes';

export default async () => {
  const { data } = await axios.get(routes.symbolsPath());
  const symbols = data.slice(0, 5);
  return (
    <App symbols={symbols} />
  );
};
