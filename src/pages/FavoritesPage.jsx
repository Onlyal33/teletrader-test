import { useSelector, shallowEqual } from 'react-redux';
import HomeTable from '../components/HomeTable';

const FavoritesPage = () => {
  const symbols = useSelector(
    (state) => {
      const favoritesSet = new Set(state.ticker.symbols.favorites);
      return state.ticker.symbols.data.filter(({ pair }) => favoritesSet.has(pair));
    },
    shallowEqual,
  );

  return (
    <HomeTable symbols={symbols} />
  );
};

export default FavoritesPage;
