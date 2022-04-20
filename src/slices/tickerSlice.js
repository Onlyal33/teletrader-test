/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const tickerSlice = createSlice({
  name: 'ticker',
  initialState: { symbols: [] },
  reducers: {
    addSymbol(state, action) {
      const { chanId, symbol, pair } = action.payload;
      state.symbols.data.push({
        id: chanId,
        symbol,
        pair,
        data: {
          dailyChange: null,
          dailyChangeRelative: null,
          lastPrice: null,
          high: null,
          low: null,
        },
      });
    },
    updateSymbolInfo(state, action) {
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
  },
});

export const {
  addSymbol,
  updateSymbolInfo,
  toggleFavorites,
} = tickerSlice.actions;

export default tickerSlice.reducer;
