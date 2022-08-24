import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SideMonthly from "../MiniMonthly";

import { getCurrent } from "../../store/slice/calendar";
import { addSchedule } from "../../store/slice/schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  isOpen: boolean;
}

const Sidebar: NextPage<IProps> = ({ isOpen }: IProps) => {
  const current = useAppSelector(getCurrent);
  const dispatch = useAppDispatch();
  const [miniCurrent, setMiniCurrent] = useState(new Date(current));

  const [start, setStart] = useState(new Date(current));
  const [end, setEnd] = useState(new Date(current));

  const [schedule, setSchedule] = useState({
    id: 0,
    title: "",
    context: "",
    label: "",
    startDate: start,
    endDate: start,
    repeat: "",
  });

  useEffect(() => {
    console.log("miniCurrent=> " + miniCurrent);
  }, [miniCurrent]);

  return (
    <>
      <div
        className={`col-start-1 row-start-1 ease-in-out border-r transition-all border-gray-300 h-full ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <SideMonthly
          miniCurrent={miniCurrent}
          setMiniCurrent={setMiniCurrent}
          mode="set"
        />

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
              <SideMonthly
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
              <SideMonthly
                miniCurrent={end}
                setMiniCurrent={setEnd}
                mode="local"
              />
              <div></div>
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
              let tempSchedule = schedule;
              tempSchedule.startDate = start;
              tempSchedule.endDate = end;
              dispatch(addSchedule(tempSchedule));
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
      </div>
    </>
  );
};

export default Sidebar;
