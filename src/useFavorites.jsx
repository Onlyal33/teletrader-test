import { useDispatch } from 'react-redux';
import { toggleFavorites } from './slices/tickerSlice';

const getFavorites = (name) => () => JSON.parse(localStorage.getItem(name)) ?? [];

const setFavorites = (name) => (data) => localStorage.setItem(name, JSON.stringify(data));

export const getFavoritePairs = getFavorites('favoritePairs');

const setFavoritePairs = setFavorites('favoritePairs');

export default () => {
  const dispatch = useDispatch();

  const toggleFavoritePairs = (isFavorite, pair) => {
    const favoritesSet = new Set(getFavoritePairs());
    const action = isFavorite ? 'delete' : 'add';
    favoritesSet[action](pair);
    const favorites = [...favoritesSet];
    dispatch(toggleFavorites(favorites));
    setFavoritePairs(favorites);
  };

  return { toggleFavoritePairs };
};
