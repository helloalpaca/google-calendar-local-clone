import type { NextComponentType, NextPage, NextPageContext } from "next";
import React, { ComponentProps, ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppSelector } from "../app/hooks";
import { getMonthlyCalendar } from "../store/slice/calendar";

interface IProps {
  days: Array<number>;
}
const Calendar: NextPage<IProps> = ({ days }: IProps) => {
  useEffect(() => {
    console.log("Calendar Component Rendered!");
  }, []);

  useEffect(() => {
    console.log("Calendar Component Rendered by days!");
  }, [days]);

  return (
    <>
      <table>
        <tbody>
          {days.map((day, index) => {
            return (
              index % 7 === 0 && (
                <tr key={index}>
                  {days.slice(index, index + 7).map((d, i) => {
                    return <td key={i}>{d}</td>;
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

export default Calendar;
