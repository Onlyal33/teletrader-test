/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const tickerSlice = createSlice({
  name: 'ticker',
  initialState: { symbols: [] },
  reducers: {
    initializeSymbols(state, action) {
      state.symbols.data = action.payload.map((symbol) => ({
        id: null,
        symbol,
        pair: null,
        data: {
          dailyChange: null,
          dailyChangeRelative: null,
          lastPrice: null,
          high: null,
          low: null,
        },
        subscribtionStatus: 'unsubscribed',
      }));
    },
    updateSymbolData(state, action) {
      const [channelId, data] = action.payload;
      const [,,,,
        dailyChange,
        dailyChangeRelative,
        lastPrice,,
        high,
        low] = data;
      const symbol = state.symbols.data.find(({ id }) => id === channelId);
      symbol.data = {
        dailyChange, dailyChangeRelative, lastPrice, high, low,
      };
    },
    toggleFavorites(state, action) {
      state.symbols.favorites = action.payload;
    },
    subscribeToChannel(state, action) {
      const item = state.symbols.data.find(({ symbol }) => symbol === action.payload.symbol);
      item.subscribtionStatus = 'subscribed';
      item.id = action.payload.chanId;
      item.pair = action.payload.pair;
    },
    unsubscribeFromChannel(state, action) {
      const channelId = action.payload.chanId;
      const item = state.symbols.data.find(({ id }) => id === channelId);
      item.subscribtionStatus = 'unsubscribed';
      item.id = null;
    },
    setSubscribtionPending(state, action) {
      const item = state.symbols.data.find(({ symbol }) => symbol === action.payload.symbol);
      item.subscribtionStatus = 'pending';
    },
    setUnsubscribtionPending(state, action) {
      const item = state.symbols.data.find(({ id }) => id === action.payload.id);
      item.subscribtionStatus = 'pending';
    },
  },
});

export const {
  initializeSymbols,
  updateSymbolData,
  toggleFavorites,
  subscribeToChannel,
  unsubscribeFromChannel,
  setSubscribtionPending,
  setUnsubscribtionPending,
} = tickerSlice.actions;

export default tickerSlice.reducer;
