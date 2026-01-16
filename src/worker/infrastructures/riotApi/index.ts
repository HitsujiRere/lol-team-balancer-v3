import type { RiotId } from "#domain/riotId";
import type { RiotApi } from "../../domain/RiotApi";
import { getLeagueEntries } from "./getLeagueEntries";
import { getPuuid } from "./getPuuid";
import { getSummoner } from "./getSummoner";

export const createRiotApi = (riotApiKey: string): RiotApi => {
  return {
    getPuuid: (riotId: RiotId) => getPuuid(riotApiKey, riotId),
    getSummoner: (puuid: string) => getSummoner(riotApiKey, puuid),
    getLeagueEntries: (puuid: string) => getLeagueEntries(riotApiKey, puuid),
  };
};
