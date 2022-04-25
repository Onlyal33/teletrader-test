import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import tickerReducer, {
  initializeSymbols, updateSymbolData, subscribeToChannel, unsubscribeFromChannel,
} from './slices/tickerSlice';
import App from './App';
import routes from './routes';
import { getFavoritePairs } from './useFavorites';
import APIContext from './contexts/APIContext';

export default async () => {
  const store = configureStore({
    reducer: {
      ticker: tickerReducer,
    },
    preloadedState: {
      ticker: {
        symbols: {
          data: [],
          favorites: getFavoritePairs(),
        },
      },
    },
  });

  const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  try {
    const { data } = await axios.get(routes.symbolsPath());
    const symbols = data.slice(0, 5).map((item) => `t${item.toUpperCase()}`);
    store.dispatch(initializeSymbols(symbols));

    // eslint-disable-next-line no-param-reassign
    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed?.event === 'subscribed') {
        store.dispatch(subscribeToChannel(parsed));
      }
      if (Array.isArray(parsed) && Array.isArray(parsed?.[1])) {
        store.dispatch(updateSymbolData(parsed));
      }
      if (parsed?.event === 'unsubscribed') {
        store.dispatch(unsubscribeFromChannel(parsed));
      }
    };

    return (
      <Provider store={store}>
        <APIContext.Provider value={socket}>
          <App />
        </APIContext.Provider>
      </Provider>
    );
  } catch (e) {
    return (
      <div>
        Error:
        {e.message}
      </div>
    );
  }
};
