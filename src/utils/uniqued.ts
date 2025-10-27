export const uniqued = <T>(array: readonly T[]): T[] => {
  return [...new Set(array)];
};
