import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stats } from "fs";
import { RootState } from "..";

type TSchedule = {
  id: number;
  title: string;
  context: string;
  label: string;
  startDate: Date;
  endDate: Date;
  repeat: string;
};

type TSchedules = {
  schedules: { [Key: string]: TSchedule[] };
  idx: number;
};

const initialState: TSchedules = {
  schedules: {},
  idx: 0,
};

export const scheduleSclice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedules: (state) => {
      state.schedules = {};
    },
    addSchedule: (state, action: PayloadAction<TSchedule>) => {
      const schedule = { ...action.payload, id: state.idx };
      const key =
        schedule.startDate.getFullYear().toString() +
        schedule.startDate.getMonth().toString() +
        schedule.startDate.getDate().toString();
      if (!state.schedules[key]) {
        state.schedules[key] = [];
      }
      state.schedules[key] = [...state.schedules[key], schedule];
      state.idx = state.idx + 1;
    },
    /*
    updateSchedule: (state, action: PayloadAction<TSchedule>) => {
      const index = state.schedules.findIndex(
        (x) => x.id === action.payload.id
      );
      state.schedules[index] = action.payload;
    },
    removeSchedule: (state, action: PayloadAction<number>) => {
      const tempSchedules = state.schedules.filter((x) => {
        return x.id != action.payload;
      });
      state.schedules = tempSchedules;
    },
    */
  },
});

export const { setSchedules, addSchedule } = scheduleSclice.actions;

export const getSchedules = (state: RootState) => state.schedule.schedules;
export const getIdx = (state: RootState) => state.schedule.idx;

export default scheduleSclice.reducer;
