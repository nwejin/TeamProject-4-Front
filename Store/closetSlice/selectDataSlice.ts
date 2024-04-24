'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchData {
  selectMajor: string;
  selectMiddle: string;
}

const initialState: searchData = {
  selectMajor: 'All',
  selectMiddle: 'All',
};

const selectDataSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    selectMajor: (state, action: PayloadAction<{ value: string }>) => {
      state.selectMajor = action.payload.value;
    },
    selectMiddle: (state, action: PayloadAction<{ value: string }>) => {
      state.selectMiddle = action.payload.value;
    },
  },
});

export const selectDataReducer = selectDataSlice.reducer;

export default selectDataSlice;

export const { selectMajor, selectMiddle } = selectDataSlice.actions;
