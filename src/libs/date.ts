import moment from 'moment';

interface Options {
  label: string;
  value: number;
}

export function getYearsList(yearsLimit = 0): Options[] {
  const currentYear = new Date().getFullYear();
  const from1to100 = [...Array(83).keys()];
  const startYear = currentYear - yearsLimit;

  return from1to100
    .map((i) => startYear - i)
    .map((year) => ({
      label: year.toString(),
      value: year,
    }));
}

export function getMonthsList(): Options[] {
  return [...Array(12).keys()]
    .map((i) => i + 1)
    .map((month) => ({
      label: month.toString().padStart(2, '0'),
      value: month,
    }));
}

export function getDaysList(year: number, month: number): Options[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  return [...Array(daysInMonth).keys()]
    .map((i) => i + 1)
    .map((day) => ({
      label: day.toString().padStart(2, '0'),
      value: day,
    }));
}

export function getDateTimestamp(
  year: number,
  month: number,
  day: number
): number {
  return new Date(year, month - 1, day).getTime();
}

export function getDateBeforeDays(days: number): Date {
  return new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
}

export function formatTime(
  time: number | string | Date,
  formatString: string
): string {
  return time ? moment(time).format(formatString) : '';
}
