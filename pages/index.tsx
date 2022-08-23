import type { NextComponentType, NextPage } from "next";
import next from "next";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverHandler,
  Button,
  PopoverContent,
} from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Monthly from "../components/Monthly";
import ScheduleList from "../components/ScheduleList";
import {
  getCurrent,
  setCurrentNextMonth,
  setCurrentPrevMonth,
  getMonthlyCalendar,
} from "../store/slice/calendar";
import { addSchedule, getIdx } from "../store/slice/schedule";
import { getSchedules } from "../store/slice/schedule";
import _ from "lodash";
import Header from "../components/Header";
import AddSchedule from "../components/AddSchedule";
import Weekly from "../components/Weekly";

const MemoCalendar = React.memo(Monthly, _.isEqual);
const MemoWeekly = React.memo(Weekly, _.isEqual);
const MemoScheduleList = React.memo(ScheduleList, _.isEqual);

const Home = () => {
  const current = useAppSelector(getCurrent);
  const schedules = useAppSelector(getSchedules);
  const dispatch = useAppDispatch();
  const idx = useAppSelector(getIdx);

  let date = new Date();

  const [isOpen, setIsOpen] = useState(true);
  const [option, setOption] = useState("월");

  return (
    <>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        option={option}
        setOption={setOption}
      />

      <div className="grid grid-cols-6 max-h-screen mt-16">
        <div
          className={`col-start-1 ease-in-out h-full transition-all border-r border-gray-300 ${
            isOpen ? "translate-x-0 " : "-translate-x-full"
          }`}
        >
          <div>미니 캘린더</div>
          <div>시간이 된다면 라벨까지...</div>

          <AddSchedule />
        </div>

        <div
          className={`col-span-5 ${
            isOpen ? "col-start-2 translate-x-0" : "col-start-1"
          }`}
        >
          {option === "월" ? <MemoCalendar /> : <MemoWeekly />}
        </div>
      </div>
    </>
  );
};

export default Home;
