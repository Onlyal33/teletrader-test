import { useSelector, shallowEqual } from 'react-redux';
import HomeTable from '../components/HomeTable';

const HomePage = () => {
  const symbols = useSelector((state) => state.ticker.symbols.data, shallowEqual);

  return (
    <HomeTable symbols={symbols} />
  );
};

export default HomePage;
