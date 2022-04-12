import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import tickerReducer from './slices/tickerSlice';
import App from './App';
import routes from './common/routes';

export default async () => {
  const { data } = await axios.get(routes.symbolsPath());
  const symbols = data.slice(0, 5);

  const store = configureStore({
    reducer: {
      ticker: tickerReducer,
    },
    preloadedState: {
      ticker: {
        symbols: [],
      },
    },
  });

  const messages = symbols.map((symbol) => JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    symbol: `t${symbol.toUpperCase()}`,
  }));

  const sockets = messages.map((message) => {
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    socket.onopen = () => {
      socket.send(message);
    };
    return socket;
  });
  return (
    <Provider store={store}>
      <App sockets={sockets} />
    </Provider>
  );
};
