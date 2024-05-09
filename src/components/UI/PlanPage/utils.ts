export function getDayOfWeek(day: number) {
  const days = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  return days[day];
}

export function getTwoDigit(num: number | string) {
  return num.toString().padStart(2, "0");
}

export function getddmmyyyy(date: Date, symbol = "/") {
  return `${getTwoDigit(date.getDate())}${symbol}${getTwoDigit(
    date.getMonth() + 1
  )}${symbol}${date.getFullYear()}`;
}
