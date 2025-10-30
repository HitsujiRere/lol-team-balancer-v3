import { randomBetween } from "./random";

export const choice = <T>(array: readonly T[]): T => {
  // biome-ignore lint/style/noNonNullAssertion: 必ず配列の値を取得できる
  return array[randomBetween(0, array.length)]!;
};
