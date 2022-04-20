import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import useFavorites from '../useFavorites';

const ToggleFavoriteButton = ({ pair }) => {
  const isFavorite = useSelector((state) => state.ticker.symbols.favorites.includes(pair));
  const { toggleFavoritePairs } = useFavorites();

  return (
    <Button
      variant={isFavorite ? 'danger' : 'info'}
      className="me-auto ms-2 text-white"
      onClick={() => toggleFavoritePairs(isFavorite, pair)}
    >
      {isFavorite ? 'Remove from' : 'Add to'}
      {' '}
      favorites
    </Button>
  );
};
export default ToggleFavoriteButton;
