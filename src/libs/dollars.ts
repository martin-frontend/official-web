export function toDollarsAmount(value: number): string {
  // return `${value.toLocaleString('en', {
  //   style: 'currency',
  //   currency: process.env.VUE_APP_CURRENCY,
  // })}`;
  return value.toLocaleString();
}
