export function percentage(num: number, total: number) {
  if (num === 0 || total === 0) return 0;

  if (num >= total) return 100;

  return Math.round((num / total) * 10000) / 100.0; // 小数点后两位百分比
}
