export const count = <T>(array: readonly T[]): number => {
  return array.reduce((res, current) => (current ? res + 1 : res), 0);
};
