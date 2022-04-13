import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toggleFavorites } from '../slices/tickerSlice';

const ToggleFavoriteButton = ({ pair }) => {
  const isFavorite = useSelector(
    (state) => state.ticker.symbols.find((symbol) => symbol.pair === pair).favorite,
  );

  const dispatch = useDispatch();
  const text = isFavorite ? 'Remove from' : 'Add to';
  return (
    <Button variant={isFavorite ? 'danger' : 'info'} className="me-auto ms-2 text-white" onClick={() => dispatch(toggleFavorites(pair))}>
      {text}
      {' '}
      favorites
    </Button>
  );
};
export default ToggleFavoriteButton;
