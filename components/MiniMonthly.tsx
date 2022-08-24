import type { NextPage } from "next";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCurrent, setCurrent } from "../store/slice/calendar";
import { getMiniMonthly } from "../utils/getMiniMonthly";
import { DayOfWeek } from "../utils/static";

interface IProps {
  miniCurrent: Date;
  setMiniCurrent: Dispatch<SetStateAction<Date>>;
  mode: "set" | "local" /* set: update current, local: setMinicurrent */;
}

const MiniMonthly: NextPage<IProps> = ({
  miniCurrent,
  setMiniCurrent,
  mode,
}: IProps) => {
  let current = useAppSelector(getCurrent);
  const dispatch = useAppDispatch();
  let days = getMiniMonthly(miniCurrent);

  useEffect(() => {
    if (mode === "set") {
      setMiniCurrent(new Date(current));
    }
  }, [current]);

  return (
    <>
      <div className="items-center justify-center">
        <span className="text-sm">
          {miniCurrent.getFullYear()}년 {miniCurrent.getMonth() + 1}월{" "}
          {miniCurrent.getDate()}일
        </span>
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="1x"
          color="#5f6367"
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() => {
            setMiniCurrent(
              new Date(miniCurrent.getFullYear(), miniCurrent.getMonth() - 1, 1)
            );
          }}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="1x"
          color="#5f6367"
          className="p-2  hover:bg-gray-200 rounded-full"
          onClick={() => {
            setMiniCurrent(
              new Date(miniCurrent.getFullYear(), miniCurrent.getMonth() + 1, 1)
            );
          }}
        />
      </div>
      <div className="text-center">
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
                    <div
                      key={i}
                      className={`border-r border-gray-300 ${d.class}`}
                      onClick={() => {
                        if (mode === "set") {
                          console.log("mode: " + mode);
                          dispatch(setCurrent(d.date));
                        } else {
                          console.log("mode: " + mode);
                          setMiniCurrent(d.date);
                        }
                      }}
                    >
                      {d.date.getDate()}
                    </div>
                  );
                })}
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default MiniMonthly;
