import type { Rank } from "#domain/rank";
import type { RiotId } from "#domain/riotId";
import type { GamePriority } from "../priority";
import type { TeamName } from "../teamName";
import type { FetchStatus } from "./fetchStatus";

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  rank: Rank;
  isMute: boolean;
  priorities: GamePriority;
  fixedTeam?: TeamName;

  fetchStatus: FetchStatus;
  fetchedLevel?: number;
  iconId?: number;
  fetchedRank?: Rank;
  rankWins?: number;
  rankLosses?: number;
};
