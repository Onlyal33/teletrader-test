import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

const renderRow = ({ symbol, pair, data }) => {
  const {
    dailyChange,
    dailyChangeRelative,
    lastPrice,
    high,
    low,
  } = data;
  return (
    <tr key={symbol}>
      <td className="text-start">
        <Link
          to={`/details/${pair}`}
          className="link-info"
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

const selectors = {
  home: (state) => state.ticker.symbols.data,
  favorites: (state) => {
    const favoritesSet = new Set(state.ticker.symbols.favorites);
    return state.ticker.symbols.data.filter(({ pair }) => favoritesSet.has(pair));
  },
};

const HomeTable = ({ type }) => {
  const symbols = useSelector(selectors[type], shallowEqual);

  return (
    <Table striped hover borderless className="shadow-sm text-end">
      <thead>
        <tr>
          <th className="text-start">Name</th>
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
};

export default HomeTable;
