import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const today = new Date();

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
  schedules: TSchedule[];
  idx: number;
};

const initialState: TSchedules = {
  schedules: [],
  idx: 0,
};

export const scheduleSclice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedules: (state) => {
      state.schedules = [];
    },
    addSchedule: (state, action: PayloadAction<TSchedule>) => {
      const schedule = { ...action.payload, id: state.idx };
      console.log("schedule: " + JSON.stringify(schedule));
      state.schedules.push(schedule);
      state.idx = state.idx + 1;
    },
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
  },
});

export const { setSchedules, addSchedule, updateSchedule, removeSchedule } =
  scheduleSclice.actions;

export const getSchedules = (state: RootState) => state.schedule.schedules;
export const getIdx = (state: RootState) => state.schedule.idx;

export default scheduleSclice.reducer;
