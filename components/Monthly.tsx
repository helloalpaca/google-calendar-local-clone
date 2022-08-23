import type { NextComponentType, NextPage, NextPageContext } from "next";
import React, { ComponentProps, ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAppSelector } from "../app/hooks";
import { getCurrent, getMonthlyCalendar } from "../store/slice/calendar";
import { getSchedules } from "../store/slice/schedule";

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
    //let tempDay = new Date(current.year, current.month, current.date);
    let tempDay = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate()
    );
    tempDay.setDate(d);

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

    return result;
  };

  return (
    <div className="text-center">
      <div className="grid grid-flow-row grid-cols-7 border-b border-gray-300 ">
        <div className="border-r border-gray-300">월</div>
        <div className="border-r border-gray-300">화</div>
        <div className="border-r border-gray-300">수</div>
        <div className="border-r border-gray-300">목</div>
        <div className="border-r border-gray-300">금</div>
        <div className="border-r border-gray-300">토</div>
        <div>일</div>
      </div>

      {days.map((day, index) => {
        return (
          index % 7 === 0 && (
            <div key={index} className="grid grid-flow-row grid-cols-7 ">
              {days.slice(index, index + 7).map((d, i) => {
                return (
                  <div
                    key={i}
                    className="border-r border-b border-gray-300 h-28"
                  >
                    {d}
                    {getSchueleByDate(d).map((s, i) => {
                      return <div key={i}>{s}</div>;
                    })}
                  </div>
                );
              })}
            </div>
          )
        );
      })}
    </div>
  );
};

export default Monthly;
