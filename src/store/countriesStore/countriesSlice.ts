import { createSlice } from '@reduxjs/toolkit';

import { getCountries } from './countriesApi';
import { CountriesState } from '../../types/types';

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  activeColumns: [
    'index',
    'name',
    'languages',
    'region',
    'population',
    'status',
    'startOfWeek',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    toggleColumn(state, action) {
      const column = action.payload;
      if (state.activeColumns.includes(column)) {
        state.activeColumns = state.activeColumns.filter((col) => col !== column);
      } else {
        state.activeColumns.push(column);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.countries = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'error';
      });
  },
});

export const { toggleColumn } = countriesSlice.actions;
export default countriesSlice.reducer;
