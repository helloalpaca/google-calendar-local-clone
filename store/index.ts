import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import calendarReducer from "./slice/calendar";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

const createStore = () => store;
const wrapper = createWrapper(createStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default wrapper;
