import type { RiotApi } from "../../domain/riotApi";
import { getLeagueEntries } from "./getLeagueEntries";
import { getPuuid } from "./getPuuid";
import { getSummoner } from "./getSummoner";

export const createRiotApi = (riotApiKey: string): RiotApi => {
  return {
    getPuuid: (riotId) => getPuuid(riotApiKey, riotId),
    getSummoner: (puuid) => getSummoner(riotApiKey, puuid),
    getLeagueEntries: (puuid) => getLeagueEntries(riotApiKey, puuid),
  };
};
