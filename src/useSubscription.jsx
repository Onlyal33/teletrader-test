import { useEffect, useContext } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { setSubscribtionPending, setUnsubscribtionPending } from './slices/tickerSlice';
import APIContext from './contexts/APIContext';

const createSubscriptionMessage = (symbol) => JSON.stringify({
  event: 'subscribe',
  channel: 'ticker',
  symbol,
});

const createUnsubscriptionMessage = (id) => JSON.stringify({
  event: 'unsubscribe',
  chanId: id,
});

const useSubscribtion = (symbols) => {
  const { getState } = useStore();
  const socket = useContext(APIContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const state = getState().ticker.symbols.data;
    const unsubscribedSymbols = symbols
      .filter((item) => state.find(({ symbol }) => symbol === item).subscribtionStatus === 'unsubscribed');
    const oversubscribedIds = state
      .filter(({ symbol, subscribtionStatus }) => !symbols.includes(symbol) && subscribtionStatus === 'subscribed')
      .map(({ id }) => id);

    socket.onopen = () => {
      unsubscribedSymbols.forEach((symbol) => {
        const message = createSubscriptionMessage(symbol);
        socket.send(message);
        dispatch(setSubscribtionPending({ symbol }));
      });
    };

    if (socket.readyState === 1) {
      unsubscribedSymbols.forEach((symbol) => {
        const message = createSubscriptionMessage(symbol);
        socket.send(message);
        dispatch(setSubscribtionPending({ symbol }));
      });
      oversubscribedIds.forEach((id) => {
        const message = createUnsubscriptionMessage(id);
        socket.send(message);
        dispatch(setUnsubscribtionPending({ id }));
      });
    }
  }, [symbols, socket, getState, dispatch]);
};

export default useSubscribtion;
