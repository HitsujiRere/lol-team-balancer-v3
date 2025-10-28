import type { Rank } from "../rank";
import type { RiotId } from "../riotId";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  rank: Rank;
  isMute: boolean;
};
