import { Table } from 'react-bootstrap';
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

const HomeTable = ({ symbols }) => (
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
      {symbols.length > 0 ? symbols.map(renderRow) : null}
    </tbody>
  </Table>
);

export default HomeTable;