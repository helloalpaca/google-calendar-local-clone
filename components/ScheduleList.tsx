import type { NextComponentType } from "next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeSchedule } from "../store/slice/schedule";
import { getSchedules } from "../store/slice/schedule";

const ScheduleList: NextComponentType = () => {
  const schedules = useAppSelector(getSchedules);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("ScheduleList Component Rendered");
  }, []);

  useEffect(() => {
    console.log("ScheduleList Component Rendered by schedules");
  }, [schedules]);

  return (
    <>
      {schedules.map((data, index) => {
        return (
          <li key={index}>
            {JSON.stringify(data)}
            <button
              onClick={() => {
                dispatch(removeSchedule(data.id));
              }}
            >
              삭제
            </button>
          </li>
        );
      })}
    </>
  );
};

export default ScheduleList;
