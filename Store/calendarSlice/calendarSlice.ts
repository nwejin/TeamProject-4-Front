// calendarSlice/calendarSlice.ts 파일 내부
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarState {
  selectedDate: string | null;
}

const initialState: CalendarState = {
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    selectDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
});

export const { selectDate } = calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer; // calendarReducer를 내보냅니다.
