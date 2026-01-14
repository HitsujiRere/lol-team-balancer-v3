import { RANKS, type Rank } from "./rank";

// TODO: 外部から変えられるように
export const rankToPoint = (rank: Rank): number => {
  return RANKS.indexOf(rank);
};

export const pointToRank = (point: number): Rank => {
  if (point < 0) {
    return RANKS[0];
  }
  if (point >= RANKS.length) {
    // biome-ignore lint/style/noNonNullAssertion: 最後尾
    return RANKS[RANKS.length - 1]!;
  }
  return RANKS[Math.round(point)] ?? "UNRANKED";
};
