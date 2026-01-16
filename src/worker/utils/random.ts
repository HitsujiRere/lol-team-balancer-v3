export const randomInt = (begin: number, end: number) => {
  return Math.floor(Math.random() * (end - begin)) + begin;
};
