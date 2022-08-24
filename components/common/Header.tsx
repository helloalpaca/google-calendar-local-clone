import type { NextPage } from "next";
import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faBars,
  faCookieBite,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getCurrent,
  setCurrentNextMonth,
  setCurrentPrevMonth,
  setCurrentToday,
} from "../../store/slice/calendar";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: NextPage<IProps> = ({ isOpen, setIsOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(getCurrent);

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

        <h1 className="text-xl mr-12">
          {current.getFullYear()}년 {current.getMonth() + 1}월
        </h1>
      </div>
    </>
  );
};

export default Header;
