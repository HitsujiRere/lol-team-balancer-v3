import type { Rank } from "#domains/rank";
import type { RiotId } from "#domains/riotId";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  rank: Rank;
  isMute: boolean;
};
