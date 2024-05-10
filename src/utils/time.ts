export enum TimeUnit {
  SECOND = "second",
  MINUTE = "minute",
  HOUR = "hour",
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}

export const VietnameseTimeUnitMap = {
  [TimeUnit.YEAR]: "năm",
  [TimeUnit.MONTH]: "tháng",
  [TimeUnit.DAY]: "ngày",
  [TimeUnit.HOUR]: "giờ",
  [TimeUnit.MINUTE]: "phút",
  [TimeUnit.SECOND]: "giây",
} as const;

export class FormattedTimeObject {
  value: number;
  unit: TimeUnit;

  constructor(value: number, unit: TimeUnit) {
    this.value = value;
    this.unit = unit;
  }

  getFormattedText = (formatter: (value: number, unit: TimeUnit) => string) =>
    formatter(this.value, this.unit);
}

export const getFormattedDiffTime = (time: number) => {
  const seconds = Math.floor(time / 1000);

  if (seconds < 60) {
    return new FormattedTimeObject(seconds, TimeUnit.SECOND);
  }
  if (seconds < 60 * 60) {
    return new FormattedTimeObject(Math.floor(seconds / 60), TimeUnit.MINUTE);
  }
  if (seconds < 60 * 60 * 24) {
    return new FormattedTimeObject(
      Math.floor(seconds / 60 / 60),
      TimeUnit.HOUR
    );
  }
  if (seconds < 60 * 60 * 24 * 30) {
    return new FormattedTimeObject(
      Math.floor(seconds / 60 / 60 / 24),
      TimeUnit.DAY
    );
  }
  if (seconds < 60 * 60 * 24 * 365) {
    return new FormattedTimeObject(
      Math.floor(seconds / 60 / 60 / 24 / 30),
      TimeUnit.MONTH
    );
  }
  return new FormattedTimeObject(
    Math.floor(seconds / 60 / 60 / 24 / 365),
    TimeUnit.YEAR
  );
};
