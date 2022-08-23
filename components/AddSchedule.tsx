import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  PopoverHandler,
  Button,
  PopoverContent,
} from "@material-tailwind/react";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCurrent } from "../store/slice/calendar";
import { addSchedule } from "../store/slice/schedule";
import _ from "lodash";

import MiniMonthly from "./MiniMonthly";

const AddSchedule: NextPage = () => {
  const current = useAppSelector(getCurrent);
  const dispatch = useAppDispatch();

  const [start, setStart] = useState(
    new Date(current.getFullYear(), current.getMonth(), current.getDate())
  );

  const [end, setEnd] = useState(
    new Date(current.getFullYear(), current.getMonth(), current.getDate())
  );

  const [schedule, setSchedule] = useState({
    id: 0,
    title: "",
    context: "",
    label: "",
    startDate: start,
    endDate: end,
    repeat: "",
  });

  useEffect(() => {
    console.log("[start]start: " + start);
    console.log("[start]end: " + end);
  }, [start]);

  useEffect(() => {
    console.log("[end]start: " + start);
    console.log("[end]end: " + end);
  }, [end]);

  const MemoMiniMonthly = React.memo(MiniMonthly, _.isEqual);

  return (
    <div className="border border-gray-300 m-2 rounded-lg">
      <div className="text-center">스케줄 추가</div>
      <input
        placeholder="제목 추가"
        className="m-2 border-b border-b-white focus:border-b-black outline-0"
        onChange={(e) => {
          setSchedule({
            ...schedule,
            title: e.target.value,
          });
        }}
      ></input>
      <br />
      <Popover placement="bottom">
        <PopoverHandler>
          <Button variant="gradient" className="p-2 bg-gray-500">
            {start.getMonth() + 1 + "월" + start.getDate() + "일"}
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <MemoMiniMonthly
            miniCurrent={start}
            setMiniCurrent={setStart}
            mode="local"
          />
        </PopoverContent>
      </Popover>

      <Popover placement="bottom">
        <PopoverHandler>
          <Button variant="gradient" className="p-2 bg-gray-500">
            {end.getMonth() + 1 + "월" + end.getDate() + "일"}
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <MemoMiniMonthly
            miniCurrent={end}
            setMiniCurrent={setEnd}
            mode="local"
          />
        </PopoverContent>
      </Popover>

      <br />

      <input
        placeholder="설명 추가"
        onChange={(e) => {
          setSchedule({
            ...schedule,
            context: e.target.value,
          });
        }}
      ></input>

      <br />

      <Button
        variant="gradient"
        className="shadow shadow-gray-300 py-2 px-8 text-black border hover:bg-gray-100"
        onClick={() => {
          console.log("schedule: " + JSON.stringify(schedule));
          dispatch(addSchedule(schedule));
        }}
      >
        <FontAwesomeIcon
          icon={faAdd}
          size="1x"
          color="#5f6367"
          className="mr-2"
        />
        추가하기
      </Button>
    </div>
  );
};

export default AddSchedule;
