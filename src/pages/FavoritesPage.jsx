import { useSelector, shallowEqual } from 'react-redux';
import useSubscription from '../useSubscription';
import HomeTable from '../components/HomeTable';

const FavoritesPage = () => {
  const symbols = useSelector(
    (state) => {
      const favoritesSet = new Set(state.ticker.symbols.favorites);
      return state.ticker.symbols.data
        .filter(({ pair }) => favoritesSet.has(pair))
        .map(({ symbol }) => symbol);
    },
    shallowEqual,
  );

  useSubscription(symbols);

  return (
    <HomeTable type="favorites" />
  );
};

export default FavoritesPage;
