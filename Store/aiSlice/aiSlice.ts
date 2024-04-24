'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Weather {
  temp: number;
  weather: string;
}

interface AiRecommend {
  weather: Weather;
}

const initialState: AiRecommend = {
  weather: { temp: 0, weather: '' },
};

const aiRecommedSlice = createSlice({
  name: 'aiRecommend',
  initialState,
  reducers: {
    setTemp: (state, action: PayloadAction<{ value: number }>) => {
      state.weather = { ...state.weather, temp: action.payload.value };
    },
    setWeather: (state, action: PayloadAction<{ value: string }>) => {
      state.weather = { ...state.weather, weather: action.payload.value };
    },
  },
});

export const aiRecommedRuducer = aiRecommedSlice.reducer;

export const { setTemp, setWeather } = aiRecommedSlice.actions;

export default aiRecommedSlice;
