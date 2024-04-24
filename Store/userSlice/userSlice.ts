'use client';

import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userId: string;
}

const initialState: UserState = {
  userId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
