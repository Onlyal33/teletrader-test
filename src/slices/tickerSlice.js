/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const tickerSlice = createSlice({
  name: 'ticker',
  initialState: { symbols: [] },
  reducers: {
    addSymbol(state, action) {
      const { chanId, symbol, pair } = action.payload;
      state.symbols.push({
        id: chanId, symbol, pair, favorite: false,
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
      const symbol = state.symbols.find(({ id }) => id === channelId);
      symbol.data = {
        dailyChange, dailyChangeRelative, lastPrice, high, low,
      };
    },
    toggleFavorites(state, action) {
      const symbol = state.symbols.find(({ id }) => id === action.payload.id);
      symbol.favorite = !symbol.favorite;
    },
  },
});

export const {
  addSymbol,
  updateSymbolInfo,
  toggleFavorites,
} = tickerSlice.actions;

export default tickerSlice.reducer;
