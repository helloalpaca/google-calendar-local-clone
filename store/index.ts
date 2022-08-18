import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import calendarReducer from "./slice/calendar";
import scheduleReducer from "./slice/schedule";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    schedule: scheduleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    //getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    getDefaultMiddleware({ serializableCheck: false }),
});

const createStore = () => store;
const wrapper = createWrapper(createStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default wrapper;
