type TDate = {
  date: Date;
  month: number;
  class: string;
};

export const getMiniMonthly = (current: Date) => {
  // 이전 달의 마지막 날 날짜와 요일 구하기)
  let startDay = new Date(current);
  startDay.setMonth(startDay.getMonth(), 0);
  let prevDate = startDay.getDate();
  let prevDay = startDay.getDay();

  // 이번 달의 마지막날 날짜와 요일 구하기
  let endDay = new Date(current);
  endDay.setMonth(endDay.getMonth() + 1, 0);
  let nextDate = endDay.getDate();
  let nextDay = endDay.getDay();

  let days = new Array<TDate>();

  // 1일의 이전요일 추가 (월~토요일)
  for (let i = prevDay; i > 0; i--) {
    days.push({
      date: new Date(
        startDay.getFullYear(),
        startDay.getMonth(),
        startDay.getDate() - i + 1
      ), //prevDate - i + 1
      month: new Date(prevDate).getMonth(),
      class: "text-gray-300",
    });
  }

  // 1일부터 이번달 마지막날까지 추가
  for (let i = 1; i <= nextDate; i++) {
    days.push({
      date: new Date(current.getFullYear(), current.getMonth(), i),
      month: current.getMonth(),
      class: "text-black",
    });
  }

  // 이번달 마지막날의 요일의 이후요일(화~일요일) 추가
  // miniCalendar는 7줄 고정
  if (days.length < 35) {
    for (let i = 1; i < 14 - nextDay + 1; i++) {
      days.push({
        date: new Date(current.getFullYear(), current.getMonth() + 1, i),
        month: new Date(nextDate).getMonth(),
        class: "text-gray-300",
      });
    }
  } else {
    for (let i = 1; i < 7 - nextDay + 1; i++) {
      days.push({
        date: new Date(current.getFullYear(), current.getMonth() + 1, i),
        month: new Date(nextDate).getMonth(),
        class: "text-gray-300",
      });
    }
  }

  return days;
};
