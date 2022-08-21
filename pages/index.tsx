import type { NextComponentType, NextPage } from "next";
import next from "next";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Calendar from "../components/Calendar";
import ScheduleList from "../components/ScheduleList";
import {
  getCurrent,
  setCurrentNextMonth,
  setCurrentPrevMonth,
  getMonthlyCalendar,
  setCurrentToday,
} from "../store/slice/calendar";
import { addSchedule, getIdx } from "../store/slice/schedule";
import { getSchedules } from "../store/slice/schedule";
import _ from "lodash";

const MemoCalendar = React.memo(Calendar, _.isEqual);
const MemoScheduleList = React.memo(ScheduleList, _.isEqual);

const Home = () => {
  const current = useAppSelector(getCurrent);
  const schedules = useAppSelector(getSchedules);
  const dispatch = useAppDispatch();
  const days = useAppSelector(getMonthlyCalendar);
  const idx = useAppSelector(getIdx);

  let date = new Date();

  const [schedule, setSchedule] = useState({
    id: 0,
    title: "",
    context: "",
    label: "",
    startDate: new Date(new Date().setMinutes(0, 0, 0)),
    endDate: new Date(date.setHours(date.getHours() + 1, 0, 0, 0)),
    repeat: "",
  });

  return (
    <>
      <h1>
        {current.year}년 {current.month + 1}월
      </h1>

      <button
        onClick={() => {
          dispatch(setCurrentToday());
        }}
        className="bg-blue-500 border-black border-2 p-3"
      >
        오늘
      </button>

      <MemoCalendar days={days} />

      <button
        onClick={() => {
          dispatch(setCurrentPrevMonth());
        }}
        className="bg-blue-500 border-black border-2 p-3"
      >
        이전달
      </button>
      <button
        onClick={() => {
          dispatch(setCurrentNextMonth());
        }}
        className="bg-blue-500 border-black border-2 p-3"
      >
        다음달
      </button>

      <div style={{ marginTop: "20px" }} />
      <h1>Schedules</h1>

      <label>제목</label>
      <input
        onChange={(e) => {
          setSchedule({
            ...schedule,
            title: e.target.value,
          });
        }}
      ></input>
      <br />
      <label>내용</label>
      <input
        onChange={(e) => {
          setSchedule({
            ...schedule,
            context: e.target.value,
          });
        }}
      ></input>
      <button
        onClick={() => {
          dispatch(addSchedule(schedule));
        }}
      >
        추가
      </button>
    </>
  );
};

export default Home;
