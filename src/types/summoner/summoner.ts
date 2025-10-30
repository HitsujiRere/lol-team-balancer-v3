import type { Rank } from "../rank";
import type { RiotId } from "../riotId";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  iconId?: number;
  rank: Rank;
  isMute: boolean;
  fetchStatus: "idle" | "loading" | "success" | "error";
};
