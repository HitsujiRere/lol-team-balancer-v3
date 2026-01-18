import { PRIORITIES } from "../priority";
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
  priorities: init.priorities ?? {
    top: PRIORITIES.medium,
    jg: PRIORITIES.medium,
    mid: PRIORITIES.medium,
    bot: PRIORITIES.medium,
    sup: PRIORITIES.medium,
  },
  fixedTeam: init.fixedTeam,
  fetchStatus: init.fetchStatus ?? FETCH_STATUSES.IDLE,
  fetchedLevel: init.fetchedLevel,
  iconId: init.iconId,
  fetchedRank: init.fetchedRank,
  rankWins: init.rankWins,
  rankLosses: init.rankLosses,
});
