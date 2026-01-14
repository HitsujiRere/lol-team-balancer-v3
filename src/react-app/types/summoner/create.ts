import type { Summoner } from "./summoner";

export const createSummoner = (
  init: Pick<Summoner, "name"> & Partial<Omit<Summoner, "name">>,
): Summoner => ({
  name: init.name,
  riotId: init.riotId,
  level: init.level ?? 0,
  rank: init.rank ?? "UNRANKED",
  isMute: init.isMute ?? false,
});
