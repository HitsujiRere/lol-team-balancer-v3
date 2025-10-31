export const average = (array: readonly number[]): number => {
  if (array.length === 0) {
    return 0;
  }
  return array.reduce((res, current) => res + current, 0) / array.length;
};
