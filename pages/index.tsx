import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getCurrent,
  getMonthlyCalendar,
  getToday,
  setCurrentNextMonth,
  setCurrentPrevMonth,
} from "../store/slice/calendar";

const Home: NextPage = () => {
  const days = useAppSelector(getMonthlyCalendar);
  const current = useAppSelector(getCurrent);
  const today = useAppSelector(getToday);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        {current.year}년 {current.month}월
      </div>
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

      <button
        onClick={() => {
          dispatch(setCurrentPrevMonth());
        }}
      >
        이전달
      </button>
      <button
        onClick={() => {
          dispatch(setCurrentNextMonth());
        }}
      >
        다음달
      </button>
    </>
  );
};

export default Home;
