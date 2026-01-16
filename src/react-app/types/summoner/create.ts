import { FETCH_STATUSES } from "./fetchStatus";
import type { Summoner } from "./summoner";

export const createSummoner = (
  init: Pick<Summoner, "name"> & Partial<Omit<Summoner, "name">>,
): Summoner => ({
  name: init.name,
  riotId: init.riotId,
  level: init.level ?? Number.NaN,
  rank: init.rank ?? "UNRANKED",
  isMute: init.isMute ?? false,
  fetchStatus: FETCH_STATUSES.IDLE,
  fetchedLevel: undefined,
  iconId: undefined,
  fetchedRank: undefined,
  rankWins: undefined,
  rankLosses: undefined,
});
