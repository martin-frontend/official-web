export const passwordValidator = (value: string) => {
  const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$%^&+=?!:~_-]{8,}/;
  return regex.test(value);
};
