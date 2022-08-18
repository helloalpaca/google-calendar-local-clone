import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const today = new Date();

type tDate = {
  year: number;
  month: number;
  date: number;
  day: number;
  hour: number;
  minute: number;
};
type tCalendar = { today: tDate; current: tDate };

const formatDate = (date: Date) => {
  return {
    year: date.getFullYear(), //2022
    month: date.getMonth(), //7 (index 0부터 시작)
    date: date.getDate(), //17
    day: date.getDay(), //Sunday - Saturday : 0 - 6
    hour: date.getHours(), // 0 ~ 23
    minute: date.getMinutes(),
  };
};

const initialState: tCalendar = {
  today: formatDate(today),
  current: formatDate(today),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setToday: (state) => {
      const today: Date = new Date();
      state.today = formatDate(today);
    },
    setCurrentNextMonth: (state) => {
      if (state.current.month === 11) {
        const nCurrent = {
          year: state.current.year + 1,
          month: 0,
          date: 1,
        };
        const tCurrent = new Date(nCurrent.year, nCurrent.month, nCurrent.date);
        state.current = formatDate(tCurrent);
      } else {
        const nCurrent = {
          year: state.current.year,
          month: state.current.month + 1,
          date: 1,
        };
        const tCurrent = new Date(
          nCurrent.year,
          nCurrent.month,
          nCurrent.date,
          7,
          0
        );
        state.current = formatDate(tCurrent);
      }
    },
    setCurrentPrevMonth: (state) => {
      if (state.current.month === 0) {
        const nCurrent = {
          year: state.current.year - 1,
          month: 11,
          date: 1,
        };
        const tCurrent = new Date(nCurrent.year, nCurrent.month, nCurrent.date);
        state.current = formatDate(tCurrent);
      } else {
        const nCurrent = {
          year: state.current.year,
          month: state.current.month - 1,
          date: 1,
        };
        const tCurrent = new Date(nCurrent.year, nCurrent.month, nCurrent.date);
        state.current = formatDate(tCurrent);
      }
    },
    setCurrentNextWeek: (state) => {
      const tobeNextWeekSunday = 7 - state.current.day;
      const nCurrent = new Date(
        state.current.year,
        state.current.month,
        state.current.date
      );
      nCurrent.setDate(nCurrent.getDate() + tobeNextWeekSunday);
      state.current = formatDate(nCurrent);
    },
    setCurrentPrevWeek: (state) => {
      const tobePrevWeekSunday = state.current.day + 7;
      const nCurrent = new Date(
        state.current.year,
        state.current.month,
        state.current.date
      );
      nCurrent.setDate(nCurrent.getDate() - tobePrevWeekSunday);
      state.current = formatDate(nCurrent);
    },
    setCurrentNextDay: (state) => {
      const nCurrent = new Date(
        state.current.year,
        state.current.month,
        state.current.date
      );
      nCurrent.setDate(nCurrent.getDate() + 1);
      state.current = formatDate(nCurrent);
    },
    setCurrentPrevDay: (state) => {
      const nCurrent = new Date(
        state.current.year,
        state.current.month,
        state.current.date
      );
      nCurrent.setDate(nCurrent.getDate() - 1);
      state.current = formatDate(nCurrent);
    },

    //TODO: Time 관련 동작 확인하기
  },
});

export const { setToday, setCurrentNextMonth, setCurrentPrevMonth } =
  calendarSlice.actions;

export const getToday = (state: RootState) => state.calendar.today;
export const getCurrent = (state: RootState) => state.calendar.current;

export const getMonthlyCalendar = (state: RootState) => {
  const current = state.calendar.current;
  // 이전 달의 마지막 날 날짜와 요일 구하기
  var startDay = new Date(current.year, current.month, 0);
  var prevDate = startDay.getDate();
  var prevDay = startDay.getDay();

  // 이번 달의 마지막날 날짜와 요일 구하기
  var endDay = new Date(current.year, current.month + 1, 0);
  var nextDate = endDay.getDate();
  var nextDay = endDay.getDay();

  let days = new Array();

  for (let i = prevDay; i > 0; i--) {
    days.push(prevDate - i + 1);
  }

  for (let i = 1; i <= nextDate; i++) {
    days.push(i);
  }

  for (let i = 1; i < 8 - nextDay; i++) {
    days.push(i);
  }

  return days;
};

//TODO: getWeeklyCalendar, getMiniCalendar
export const getWeeklyCalendar = (state: tDate) => {};

export default calendarSlice.reducer;
