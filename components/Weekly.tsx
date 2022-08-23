import type { NextComponentType, NextPage, NextPageContext } from "next";
import React, { ComponentProps, ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAppSelector } from "../app/hooks";
import {
  getCurrent,
  getMonthlyCalendar,
  getWeeklyCalendar,
} from "../store/slice/calendar";
import { getSchedules } from "../store/slice/schedule";

const Weekly: NextPage = () => {
  const days = useAppSelector(getWeeklyCalendar);

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
          <tr>
            {days.map((day, index) => {
              return <td key={index}>{day}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Weekly;
