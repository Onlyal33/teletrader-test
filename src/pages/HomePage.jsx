import { useSelector, shallowEqual } from 'react-redux';
import useSubscription from '../useSubscription';
import HomeTable from '../components/HomeTable';

const HomePage = () => {
  const symbols = useSelector(
    (state) => state.ticker.symbols.data.map(({ symbol }) => symbol),
    shallowEqual,
  );

  useSubscription(symbols);

  return (
    <HomeTable type="home" />
  );
};

export default HomePage;
