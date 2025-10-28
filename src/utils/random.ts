export const randomBetween = (begin: number, end: number): number => {
  return Math.floor(Math.random() * (end - begin)) + begin;
};
