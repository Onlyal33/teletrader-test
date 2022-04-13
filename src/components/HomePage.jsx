import { useSelector, shallowEqual } from 'react-redux';
import HomeTable from './HomeTable';

const HomePage = () => {
  const symbols = useSelector((state) => state.ticker.symbols, shallowEqual);

  return (
    <HomeTable symbols={symbols} />
  );
};

export default HomePage;
