export function percentage(num: number, total: number) {
  return `${Math.round((num / total) * 10000) / 100.0}%`; // 小数点后两位百分比
}
