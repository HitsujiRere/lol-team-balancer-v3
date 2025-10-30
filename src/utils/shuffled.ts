import { randomBetween } from "./random";

export const shuffled = <T>(array: readonly T[]): T[] => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = randomBetween(0, i + 1);
    // biome-ignore lint/style/noNonNullAssertion: i,jは常に配列の範囲内
    [newArray[i], newArray[j]] = [newArray[j]!, newArray[i]!];
  }

  return newArray;
};
