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
      let _row = idx + 5;
      let _start = d.startDate.getDay();

      //TODO : _end 이부분이 문제인듯
      let _end =
        Math.ceil(
          (d.endDate.valueOf() - d.startDate.valueOf()) / (1000 * 60 * 60 * 24)
        ) + 2;
      // TODO : 여러주에 걸친 일정 렌더링 고민하기
      if (_end > 9 || _end === 0) {
        _end = 8;
      }
      let _title = d.title;

      result.push({ row: _row, start: _start, end: _end, title: _title });
    });
  }

  return result;
  //return sch[key];

  /*
  for (let i = 0; i < sch.length; i++) {
    if (
      tempDate.getFullYear() === sch[i].startDate.getFullYear() &&
      tempDate.getMonth() === sch[i].startDate.getMonth() &&
      tempDate.getDate() === sch[i].startDate.getDate()
    ) {
      if (result.length < 2) {
        result.push(sch[i].title);
      } else if (result.length === 2) {
        result.push("...");
      }
    }
  }*/
  /**
   * 1. 비교를 검사할때 같은 날짜가 아니라, startDate와 endDate 사이에 존재하는지 여부 확인
   * 2. start-{n}과 end-{n}도 저장
   * 3. schedule 구조?
   */
};
