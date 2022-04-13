import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import routes from '../routes';
import ToggleFavoriteButton from './ToggleFavoriteButton';
import { AuthContext } from '../contexts/AuthProvider';

const DetailsPage = () => {
  const params = useParams();
  const { pair } = params;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState({});
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get(routes.symbolPath(pair))
      .then(({ data }) => data)
      .then(
        ({ high, low, last_price: lastPrice }) => {
          setIsLoaded(true);
          setDetails({
            pair, high, low, lastPrice,
          });
        },
        (e) => {
          setIsLoaded(true);
          setError(e);
        },
      );
  }, [pair]);

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  } if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const {
    lastPrice, high, low,
  } = details;

  return (
    <>
      <Table striped hover borderless className="shadow-sm text-end">
        <thead>
          <tr>
            <th className="text-start">Symbol</th>
            <th>Last Price</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-start">{pair.toUpperCase()}</td>
            <td>{lastPrice}</td>
            <td>{high}</td>
            <td>{low}</td>
          </tr>
        </tbody>
      </Table>
      {auth.loggedIn ? <ToggleFavoriteButton pair={pair} /> : null}
    </>
  );
};

export default DetailsPage;