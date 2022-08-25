import { title } from "process";

type TSchedule = {
  id: number;
  title: string;
  context: string;
  label: string;
  startDate: Date;
  endDate: Date;
  repeat: string;
};

type TScheduleView = {
  row: number;
  start: number;
  end: number;
  title: string;
};

export const getScheduleByDate = (
  d: number,
  current: Date,
  schedules: { [Key: string]: TSchedule[] }
) => {
  const sch = schedules;
  //let result = Array<TScheduleView>;
  let result: TScheduleView[] = [];
  const tempDate = new Date(current.getFullYear(), current.getMonth(), d); //tempDate is MondayOfWeek

  const key =
    tempDate.getFullYear().toString() +
    tempDate.getMonth().toString() +
    tempDate.getDate().toString();

  if (sch[key]) {
    sch[key].forEach((d, idx) => {
      let _row = idx + 2;
      let _start = d.startDate.getDay();

      const startDate = new Date(d.startDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(d.endDate);
      endDate.setHours(0, 0, 0, 0);

      //TODO : _end 이부분이 문제인듯
      let distance =
        (endDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000) + 1;
      let _end = _start + distance;
      // TODO : 여러주에 걸친 일정 렌더링 고민하기
      if (_end > 7) {
        _end = 8;
      }
      let _title = d.title;

      result.push({ row: _row, start: _start, end: _end, title: _title });
    });
  }

  return result;
};

export const getScheduleOfWeek = (
  d: number,
  current: Date,
  schedules: { [Key: string]: TSchedule[] }
) => {
  let result: TScheduleView[] = [];
  for (let i = 0; i < 7; i++) {
    const tempDate = new Date(current.getFullYear(), current.getDate(), d + i);

    const scheduleByDate = getScheduleByDate(
      tempDate.getDate(),
      current,
      schedules
    );

    for (let j = 0; j < scheduleByDate.length; j++) {
      result.push(scheduleByDate[j]);
    }
  }

  return result;
};
