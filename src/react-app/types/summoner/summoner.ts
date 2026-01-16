import type { Rank } from "#domain/rank";
import type { RiotId } from "#domain/riotId";
import type { FetchStatuses } from "./fetchStatus";

type FetchedProfile = {
  fetchedLevel: number;
  iconId: number;
  fetchedRank: Rank;
  rankWins: number;
  rankLosses: number;
};

export type Summoner = {
  name: string;
  riotId?: RiotId;
  level: number;
  rank: Rank;
  isMute: boolean;
} & (
  | ({
      fetchStatus: FetchStatuses["SUCCESS"];
    } & FetchedProfile)
  | ({
      fetchStatus: FetchStatuses["IDLE" | "LOADING" | "NOT_FOUND" | "ERROR"];
    } & { [T in keyof FetchedProfile]: undefined })
);
