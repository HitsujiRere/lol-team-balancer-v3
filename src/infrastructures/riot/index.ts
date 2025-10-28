import type { RiotId } from "@/types/riotId";
import { getLeagueEntriesDTO } from "./getLeagueEntriesDTO";
import { getPuuid } from "./getPuuid";
import { getSummonerDTO } from "./getSummonerDTO";

export const createRiotApi = async () => {
  const riotApiKey = process.env.RIOT_API_KEY ?? "";

  return {
    getPuuid: (riotId: RiotId) => getPuuid(riotApiKey, riotId),
    getSummonerDTO: (puuid: string) => getSummonerDTO(riotApiKey, puuid),
    getLeagueEntriesDTO: (puuid: string) =>
      getLeagueEntriesDTO(riotApiKey, puuid),
  };
};
