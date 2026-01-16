import type { Rank } from "#domain/rank";
import type { RiotId } from "#domain/riotId";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  rank: Rank;
  isMute: boolean;
};
