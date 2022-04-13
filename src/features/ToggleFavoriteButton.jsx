import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toggleFavorites } from '../slices/tickerSlice';

const ToggleFavoriteButton = ({ pair }) => {
  const isFavorite = useSelector(
    (state) => state.ticker.symbols.find((symbol) => symbol.pair === pair).favorite,
  );

  const dispatch = useDispatch();
  const text = isFavorite ? 'Remove' : 'Add';
  return (
    <Button variant={isFavorite ? 'danger' : 'primary'} className="ms-auto" onClick={() => dispatch(toggleFavorites(pair))}>
      {text}
      {' '}
      Favorite
    </Button>
  );
};
export default ToggleFavoriteButton;
