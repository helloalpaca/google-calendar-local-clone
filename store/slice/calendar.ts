import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type TCalendar = { today: Date; current: Date };

const today = new Date();

const initialState: TCalendar = {
  today: today,
  current: today,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setToday: (state) => {
      const today: Date = new Date();
      state.today = today;
    },

    setCurrent: (state, action: PayloadAction<Date>) => {
      state.current = action.payload;
    },

    setCurrentToday: (state) => {
      const today: Date = new Date();
      state.today = today;
      state.current = today;
    },

    setCurrentNextMonth: (state) => {
      const temp = new Date(
        state.current.getFullYear(),
        state.current.getMonth() + 1
      );

      state.current = temp;
    },

    setCurrentPrevMonth: (state) => {
      const temp = new Date(
        state.current.getFullYear(),
        state.current.getMonth() - 1
      );

      state.current = temp;
    },

    setCurrentNextWeek: (state) => {
      const tobeNextWeekMonday = 7 - state.current.getDay();
      const temp = new Date(
        state.current.getFullYear(),
        state.current.getMonth(),
        state.current.getDate() + tobeNextWeekMonday
      );

      state.current = temp;
    },

    setCurrentPrevWeek: (state) => {
      const tobeNextWeekMonday = 14 - state.current.getDay();
      const temp = new Date(
        state.current.getFullYear(),
        state.current.getMonth(),
        state.current.getDate() - tobeNextWeekMonday
      );
      state.current = temp;
    },

    setCurrentNextDay: (state) => {
      const temp = new Date(
        state.current.getFullYear(),
        state.current.getMonth(),
        state.current.getDate() + 1
      );
      state.current = temp;
    },

    setCurrentPrevDay: (state) => {
      const temp = new Date(
        state.current.getFullYear(),
        state.current.getMonth(),
        state.current.getDate() - 1
      );
      state.current = temp;
    },

    //TODO: Time 관련 동작 확인하기
  },
});

export const {
  setToday,
  setCurrentToday,
  setCurrent,
  setCurrentNextMonth,
  setCurrentPrevMonth,
} = calendarSlice.actions;

export const getToday = (state: RootState) => state.calendar.today;
export const getCurrent = (state: RootState) => state.calendar.current;

//TODO: getWeeklyCalendar, getMiniCalendar
/*
export const getWeeklyCalendar = (state: RootState) => {
  let days = new Array<number>();
  const currentDay = state.calendar.current.getDay();

  for (let i = currentDay - 1; i > 0; i--) {
    let temp = new Date(state.calendar.current);
    temp.setDate(temp.getDate() - i);

    days.push(temp.getDate());
  }

  days.push(state.calendar.current.getDate());

  for (let i = 1; i < currentDay + 2; i++) {
    let temp = new Date(state.calendar.current);
    temp.setDate(temp.getDate() + i);

    days.push(temp.getDate());
  }

  return days;
};*/

export default calendarSlice.reducer;
