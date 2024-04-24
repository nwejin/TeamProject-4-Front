'use client';

import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userNickName: string;
  userImg: string;
}

const initialState: UserState = {
  userNickName: '',
  userImg: '',
};

const userNickNameSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserNickName(state, action) {
      state.userNickName = action.payload;
    },
    setUserImg(state, action) {
      state.userImg = action.payload;
    },
  },
});

export const userDataReducer = userNickNameSlice.reducer;

export default userNickNameSlice;

export const { setUserNickName, setUserImg } = userNickNameSlice.actions;
