import type { NextPage } from "next";
import React, { useEffect } from "react";

import { useAppSelector } from "../app/hooks";
import { getCurrent, getMonthlyCalendar } from "../store/slice/calendar";
import { getSchedules } from "../store/slice/schedule";
import { DayOfWeek } from "../utils/static";

const Monthly: NextPage = () => {
  useEffect(() => {
    console.log("Calendar Component Rendered!");
  }, []);

  const days = useAppSelector(getMonthlyCalendar);
  const schedules = useAppSelector(getSchedules);
  const current = useAppSelector(getCurrent);

  const getSchueleByDate = (d: number) => {
    const sch = schedules;
    const result = [];
    let tempDay = new Date(current.getFullYear(), current.getMonth(), d);

    for (let i = 0; i < sch.length; i++) {
      if (
        tempDay.getFullYear() === sch[i].startDate.getFullYear() &&
        tempDay.getMonth() === sch[i].startDate.getMonth() &&
        tempDay.getDate() === sch[i].startDate.getDate()
      ) {
        if (result.length < 2) {
          result.push(sch[i].title);
        } else if (result.length === 2) {
          result.push("...");
        }
      }
    }

    console.log(result);

    return result;
  };

  return (
    <div className="text-center min-h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-7 border-b border-gray-300">
        {DayOfWeek.map((d, i) => {
          return (
            <div key={i} className="border-r border-gray-300">
              {d}
            </div>
          );
        })}
      </div>

      {days.map((day, index) => {
        return (
          index % 7 === 0 && (
            <div
              key={index}
              className="grid grid-cols-7 border-b border-gray-300"
            >
              {days.slice(index, index + 7).map((d, i) => {
                return (
                  <div key={i} className="border-r border-gray-300">
                    {d}
                    {getSchueleByDate(d).map((s, i) => {
                      return <div key={i}>{s}</div>;
                    })}
                  </div>
                );
              })}

              {/*
             1. 일정 길이가 긴거 -> 짧은거 순으로 렌더링.
             2. col-start-1이 세개가 넘어가면 ... 렌더링하기   
            */}

              <div className="row-start-2 col-start-1 col-end-7 border-r border-gray-300 bg-yellow-200 rounded-md">
                Calendar를 grid로 구현
              </div>
              <div className="row-start-3 col-start-1 col-end-6  border-r border-gray-300 bg-blue-200 rounded-md">
                여러날에 걸친 일정은 col-start-n, col-end-n으로 표현
              </div>
              <div className="row-start-4 col-start-2 col-end-4 border-r border-gray-300 bg-pink-200 rounded-md">
                월요일부터 시작일-끝일이 긴것부터 렌더링
              </div>
              <div className="row-start-4 col-start-1 border-r border-gray-300 bg-gray-200 rounded-md">
                ...
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Monthly;
