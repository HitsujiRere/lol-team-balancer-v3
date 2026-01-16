import { randomInt } from "./random";

export const choice = <T>(array: readonly T[]): T => {
  return array[randomInt(0, array.length)];
};
