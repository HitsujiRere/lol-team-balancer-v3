import type { Summoner } from "./summoner";

export const createSummoner = (
  name: string,
  init?: Partial<Omit<Summoner, "name">>,
): Summoner => {
  return {
    name,
    riotId: init?.riotId,
    level: init?.level ?? 0,
    iconId: init?.iconId,
    rank: init?.rank ?? "UNRANKED",
    isMute: init?.isMute ?? false,
    fetchStatus: init?.fetchStatus ?? "idle",
    rankWins: init?.rankWins,
    rankLosses: init?.rankLosses,
  };
};
