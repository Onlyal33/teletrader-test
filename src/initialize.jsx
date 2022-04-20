import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import tickerReducer from './slices/tickerSlice';
import App from './App';
import routes from './routes';
import { AuthProvider } from './contexts/AuthProvider';

export default async () => {
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

  try {
    const { data } = await axios.get(routes.symbolsPath());
    const symbols = data.slice(0, 5);

    const messages = symbols.map((symbol) => JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: `t${symbol.toUpperCase()}`,
    }));

    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
    socket.onopen = () => {
      messages.forEach((message) => {
        socket.send(message);
      });
    };

    return (
      <Provider store={store}>
        <AuthProvider>
          <App socket={socket} />
        </AuthProvider>
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
