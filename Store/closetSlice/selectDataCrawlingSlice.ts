'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchData {
  selectMajorCraw: string;
  selectMiddleCraw: string;
}

const initialState: searchData = {
  selectMajorCraw: 'All',
  selectMiddleCraw: 'All',
};

const selectDataCrawlingSlice = createSlice({
  name: 'searchcrawling',
  initialState,
  reducers: {
    selectMajorCraw: (state, action: PayloadAction<{ value: string }>) => {
      state.selectMajorCraw = action.payload.value;
    },
    selectMiddleCraw: (state, action: PayloadAction<{ value: string }>) => {
      state.selectMiddleCraw = action.payload.value;
    },
  },
});

export const selectCrawlingDataReducer = selectDataCrawlingSlice.reducer;

export default selectDataCrawlingSlice;

export const { selectMajorCraw, selectMiddleCraw } =
  selectDataCrawlingSlice.actions;
