import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface img {
  img: string;
}

const initialState: img = {
  img: '',
};

const imgSlice = createSlice({
  name: 'img',
  initialState,
  reducers: {
    s3Img: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    },
  },
});

export default imgSlice;

export const { s3Img } = imgSlice.actions;
