import { Table } from 'react-bootstrap';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

const renderRow = ({ id, pair, data }) => {
  const {
    dailyChange,
    dailyChangeRelative,
    lastPrice,
    high,
    low,
  } = data;
  return (
    <tr key={id}>
      <td>
        <Link
          to={`/details/${pair}`}
        >
          {pair}
        </Link>
      </td>
      <td>{lastPrice}</td>
      <td>{dailyChange}</td>
      <td>{dailyChangeRelative?.toLocaleString('en', { style: 'percent', maximumFractionDigits: 2 })}</td>
      <td>{high}</td>
      <td>{low}</td>
    </tr>
  );
};

const HomePage = () => {
  const symbols = useSelector((state) => state.ticker.symbols, shallowEqual);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last</th>
          <th>Change</th>
          <th>Change percent</th>
          <th>High</th>
          <th>Low</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map(renderRow)}
      </tbody>
    </Table>
  );
};

export default HomePage;
