'use client';

import { createSlice } from '@reduxjs/toolkit';

interface MainState {
  backButtonVisible: boolean;
}

const initialState: MainState = {
  backButtonVisible: true,
};

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    showBackButton: (state) => {
      state.backButtonVisible = true;
    },

    hideBackButton: (state) => {
      state.backButtonVisible = false;
    },
  },
});

export const { showBackButton, hideBackButton } = mainPageSlice.actions;

export default mainPageSlice.reducer;
