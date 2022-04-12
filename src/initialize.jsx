import axios from 'axios';
import App from './App';
import routes from './common/routes';

export default async () => {
  const { data } = await axios.get(routes.symbolsPath());
  const symbols = data.slice(0, 5);

  const messages = symbols.map((symbol) => JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    symbol: `t${symbol.toUpperCase()}`,
  }));

  const sockets = messages.map((message, index) => {
    const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    socket.onopen = () => {
      console.log(`[open] Connection established. Sending to server ${index}`);
      socket.send(message);
    };
    return socket;
  });
  return (
    <App sockets={sockets} />
  );
};
