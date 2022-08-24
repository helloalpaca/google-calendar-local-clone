export const getMonthly = (current: Date) => {
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

  let days = new Array<number>();

  for (let i = prevDay; i > 0; i--) {
    days.push(prevDate - i + 1);
  }

  for (let i = 1; i <= nextDate; i++) {
    days.push(i);
  }

  for (let i = 1; i < 7 - nextDay + 1; i++) {
    days.push(i);
  }

  return days;
};
