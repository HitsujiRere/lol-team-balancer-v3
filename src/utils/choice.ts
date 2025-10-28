import { randomBetween } from "./random";

export const choice = <T>(array: readonly T[]): T => {
  return array[randomBetween(0, array.length)];
};
