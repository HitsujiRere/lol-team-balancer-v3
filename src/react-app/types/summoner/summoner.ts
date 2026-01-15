import type { Rank } from "#models/rank";
import type { RiotId } from "#models/riotId";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  rank: Rank;
  isMute: boolean;
};
