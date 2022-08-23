import type { NextPage } from "next";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faBars,
  faCaretDown,
  faCookieBite,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getCurrent,
  setCurrentNextMonth,
  setCurrentPrevMonth,
  setCurrentToday,
} from "../store/slice/calendar";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  option: string;
  setOption: Dispatch<SetStateAction<string>>;
}

const Header: NextPage<IProps> = ({
  isOpen,
  setIsOpen,
  option,
  setOption,
}: IProps) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(getCurrent);
  const [isOption, setIsOption] = useState(false);

  return (
    <>
      <div className="flex w-screen h-16 top-0 items-center border-gray-300 border-y justify-between">
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          color="#5f6367"
          className="p-3 ml-3"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />

        <FontAwesomeIcon
          icon={faCookieBite}
          size="2x"
          color="#bff000"
          className="ml-3 mr-2"
        />

        <div className="text-2xl">캘린더</div>

        <button
          className="border border-gray-300 py-2 px-3 rounded-lg ml-12"
          onClick={() => {
            dispatch(setCurrentToday());
          }}
        >
          오늘
        </button>

        <FontAwesomeIcon
          icon={faAngleLeft}
          size="1x"
          color="#5f6367"
          className="w-4 h-4 p-2 my-3 ml-6 hover:bg-gray-200 rounded-full"
          onClick={() => {
            dispatch(setCurrentPrevMonth());
          }}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="1x"
          color="#5f6367"
          className="w-4 h-4 p-2 mr-3  hover:bg-gray-200 rounded-full"
          onClick={() => {
            dispatch(setCurrentNextMonth());
          }}
        />

        <h1 className="text-xl">
          {current.getFullYear()}년 {current.getMonth() + 1}월
        </h1>

        <Menu>
          <MenuHandler>
            <Button className="text-black border border-gray-300 p-2 m-4">
              {option}
              <FontAwesomeIcon
                icon={faCaretDown}
                size="1x"
                color="#5f6367"
                className="ml-4"
                onClick={() => {}}
              />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem
              onClick={() => {
                setOption("월");
                setIsOption(false);
                console.log("월 clicked!");
              }}
            >
              월
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOption("주");
                setIsOption(false);
                console.log("주 clicked!");
              }}
            >
              주
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOption("일");
                setIsOption(false);
                console.log("일 clicked!");
              }}
            >
              일
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

export default Header;
