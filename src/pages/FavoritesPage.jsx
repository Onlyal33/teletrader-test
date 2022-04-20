import { useSelector, shallowEqual } from 'react-redux';
import HomeTable from '../components/HomeTable';

const FavoritesPage = () => {
  const symbols = useSelector(
    (state) => state.ticker.symbols.filter(({ favorite }) => favorite),
    shallowEqual,
  );

  return (
    <HomeTable symbols={symbols} />
  );
};

export default FavoritesPage;
