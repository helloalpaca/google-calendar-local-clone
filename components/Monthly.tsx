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
        result.push(sch[i].title);
      }
    }
    return result;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
            <th>일</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => {
            return (
              index % 7 === 0 && (
                <tr key={index} className="max-h-12">
                  {days.slice(index, index + 7).map((d, i) => {
                    return (
                      // <td key={i} className="border flex flex-col p-3">
                      //   {d}
                      // </td>
                      <td key={i} className="border-4 border-blue-300">
                        <div
                          className="px-12 h-24"
                          //className="cursor-pointer ml-[-1px] indent-3 bg-[#7986CB] h-[20px] w-full mr-2 rounded-r-[4px] flex items-center text-xs text-white"
                        >
                          {d}
                          {getSchueleByDate(d).map((s, i) => {
                            return <div>{s}</div>;
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Monthly;
