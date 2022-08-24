/* 0824 TODO: 코드 정리 */
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/hooks";
import { getCurrent } from "../store/slice/calendar";
import { getSchedules } from "../store/slice/schedule";
import { getMonthly } from "../utils/getMonthly";
import { getScheduleByDate } from "../utils/getScheduleByDate";
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

              {getScheduleByDate(day, current, schedules).map((d, idx) => {
                {
                  console.log("d.start: " + d.start + ", d.end: " + d.end);
                }
                return (
                  <div
                    key={idx}
                    className={`row-start-${d.row} col-start-${d.start} col-end-${d.end} border-gray-300 bg-yellow-200 rounded-md`}
                  >
                    {d.title}
                  </div>
                );
              })}

              {/*
             1. 일정 길이가 긴거 -> 짧은거 순으로 렌더링.
             2. col-start-1이 세개가 넘어가면 ... 렌더링하기   
            */}

              <div className="row-start-2 col-start-1 col-end-7 border-gray-300 bg-yellow-200 rounded-md">
                Calendar를 grid로 구현
              </div>
              <div className="row-start-3 col-start-1 col-end-6 border-gray-300 bg-blue-200 rounded-md">
                여러날에 걸친 일정은 col-start-n, col-end-n으로 표현
              </div>
              <div className="row-start-4 col-start-2 col-end-4  border-gray-300 bg-pink-200 rounded-md">
                월요일부터 시작일-끝일이 긴것부터 렌더링
              </div>
              <div className="row-start-4 col-start-1 border-gray-300 bg-gray-200 rounded-md">
                ...
              </div>

              <div className="row-start-4 col-start-5 border-gray-300 bg-gray-200 rounded-md">
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
