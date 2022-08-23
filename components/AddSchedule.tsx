import {
  Popover,
  PopoverHandler,
  Button,
  PopoverContent,
} from "@material-tailwind/react";
import type { NextPage } from "next";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addSchedule } from "../store/slice/schedule";

const AddSchedule: NextPage = () => {
  let date = new Date();
  const dispatch = useAppDispatch();

  const [schedule, setSchedule] = useState({
    id: 0,
    title: "",
    context: "",
    label: "",
    startDate: new Date(new Date().setMinutes(0, 0, 0)),
    endDate: new Date(date.setHours(date.getHours() + 1, 0, 0, 0)),
    repeat: "",
  });

  return (
    <Popover placement="right-start">
      <PopoverHandler>
        <Button variant="gradient" className="p-2 bg-gray-500">
          만들기
        </Button>
      </PopoverHandler>
      <PopoverContent>
        <input
          placeholder="제목 추가"
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
              현재 날짜
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div>미니 달력</div>
          </PopoverContent>
        </Popover>

        <Popover placement="bottom">
          <PopoverHandler>
            <Button variant="gradient" className="p-2 bg-gray-500">
              시작 시간
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div>DropDown</div>
          </PopoverContent>
        </Popover>

        <Popover placement="bottom">
          <PopoverHandler>
            <Button variant="gradient" className="p-2 bg-gray-500">
              끝 날짜
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div>미니 달력</div>
          </PopoverContent>
        </Popover>

        <Popover placement="bottom">
          <PopoverHandler>
            <Button variant="gradient" className="p-2 bg-gray-500">
              끝 시간
            </Button>
          </PopoverHandler>
          <PopoverContent>
            <div>DropDown</div>
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
        <button
          onClick={() => {
            dispatch(addSchedule(schedule));
          }}
        >
          추가
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default AddSchedule;
