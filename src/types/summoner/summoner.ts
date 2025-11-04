import type { Team } from "@/features/TeamBalancer/types/team";
import type { Rank } from "../rank";
import type { RiotId } from "../riotId";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  iconId?: number;
  rank: Rank;
  isMute: boolean;
  fetchStatus: "idle" | "loading" | "success" | "error" | "not-found";
  rankWins?: number;
  rankLosses?: number;
  lockTeam: LockTeam;
};

export type LockTeam = Team | "None";
