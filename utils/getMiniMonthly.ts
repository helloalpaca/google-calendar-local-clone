type TDate = {
  date: Date;
  month: number;
  class: string;
};

export const getMiniMonthly = (current: Date) => {
  // 이전 달의 마지막 날 날짜와 요일 구하기)
  var startDay = current;
  startDay.setMonth(current.getMonth(), 0);
  var prevDate = startDay.getDate();
  var prevDay = startDay.getDay();

  // 이번 달의 마지막날 날짜와 요일 구하기
  var endDay = current;
  endDay.setMonth(current.getMonth() + 2, 0);
  var nextDate = endDay.getDate();
  var nextDay = endDay.getDay();

  let days = new Array<TDate>();

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

  for (let i = 1; i <= nextDate; i++) {
    days.push({
      date: new Date(current.getFullYear(), current.getMonth(), i),
      month: current.getMonth(),
      class: "text-black",
    });
  }

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
