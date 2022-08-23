import type { NextPage } from "next";
import React, { useState } from "react";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import Monthly from "../components/Monthly";
import { getCurrent } from "../store/slice/calendar";
import { getIdx } from "../store/slice/schedule";
import { getSchedules } from "../store/slice/schedule";
import Header from "../components/Header";
import AddSchedule from "../components/AddSchedule";
import Weekly from "../components/Weekly";
import MiniMonthly from "../components/MiniMonthly";

const MemoMonthly = React.memo(Monthly, _.isEqual);
const MemoWeekly = React.memo(Weekly, _.isEqual);
const MemoMiniMonthly = React.memo(MiniMonthly, _.isEqual);

const Home: NextPage = () => {
  const current = useAppSelector(getCurrent);
  const schedules = useAppSelector(getSchedules);
  const dispatch = useAppDispatch();
  const idx = useAppSelector(getIdx);

  let date = new Date();

  const [isOpen, setIsOpen] = useState(true);
  const [option, setOption] = useState("월");
  const [miniCurrent, setMiniCurrent] = useState(current);

  return (
    <div className="h-screen max-h-screen min-h-screen">
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        option={option}
        setOption={setOption}
      />

      <div className={"grid grid-cols-6 h-[calc(100vh-4rem)]"}>
        <div
          className={`col-end-7 row-start-1 ${
            isOpen ? "col-start-2" : "col-start-1"
          }`}
        >
          {option === "월" ? <MemoMonthly /> : <MemoWeekly />}
        </div>
        <div
          className={`col-start-1 row-start-1 ease-in-out border-r transition-all border-gray-300 h-full ${
            isOpen ? "translate-x-0 " : "-translate-x-full"
          }`}
        >
          <MemoMiniMonthly
            miniCurrent={miniCurrent}
            setMiniCurrent={setMiniCurrent}
            mode="set"
          />

          <AddSchedule />
        </div>
      </div>
    </div>
  );
};

export default Home;
