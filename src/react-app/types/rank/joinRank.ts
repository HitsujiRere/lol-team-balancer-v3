import { isMasterPlus, isUnranked } from "./isTier";
import type { Rank, RankNumber, Tier } from "./rank";

export const joinRank = (tier: Tier, rankNumber: RankNumber): Rank => {
  if (isUnranked(tier) || isMasterPlus(tier)) {
    return tier;
  }
  return `${tier}_${rankNumber}`;
};
