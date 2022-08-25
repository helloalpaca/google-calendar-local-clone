/* 0824 TODO: 코드 정리 */
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import { getCurrent } from "../store/slice/calendar";
import { getSchedules } from "../store/slice/schedule";
import { getMonthly } from "../utils/getMonthly";
import { getScheduleOfWeek } from "../utils/getScheduleByDate";
import { DayOfWeek } from "../utils/static";

const Monthly: NextPage = () => {
  const schedules = useAppSelector(getSchedules);
  const current = useAppSelector(getCurrent);
  const [tempCurrent, setTempCurrent] = useState(new Date(current));
  const days = getMonthly(tempCurrent);

  useEffect(() => {
    setTempCurrent(new Date(current));
  }, [current]);

  return (
    <div className="text-center min-h-[calc(100vh-4rem)] ">
      <div className="grid grid-cols-7 border-b border-gray-300 ">
        {DayOfWeek.map((d, i) => {
          return (
            <div key={i} className="border-r border-gray-300 grid-rows-${i}">
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
                    {/* {getScheduleByDate(d, current, schedules).map((s, i) => {
                      return <div key={i}>{s}</div>;
                    })} */}
                  </div>
                );
              })}

              {getScheduleOfWeek(day, current, schedules).map((d, idx) => {
                return (
                  <div
                    key={idx}
                    className={`border-gray-300 bg-yellow-200 rounded-md`}
                    style={{ gridColumn: d.start + "/" + d.end }}
                  >
                    {d.title}
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
