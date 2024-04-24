'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Status {
  status: boolean;
}

const initialState: Status = {
  status: true,
};

const showListSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    showList: (state, action: PayloadAction<boolean>) => {
      // console.log(action);
      state.status = action.payload;
    },
  },
});

export const showListReducer = showListSlice.reducer;
// reducer를 따로 export
export default showListSlice;
export const { showList } = showListSlice.actions;
