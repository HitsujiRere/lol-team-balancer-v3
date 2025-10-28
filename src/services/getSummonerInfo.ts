import type { ContentfulStatusCode } from "hono/utils/http-status";
import { err, ok, type Result } from "neverthrow";
import { createRiotApi } from "@/infrastructures/riot";
import { joinRank, type Rank } from "@/types/rank";
import { parseRiotId } from "@/types/riotId";

type SummonerInfo = {
  summonerLevel: number;
  profileIconId: number;
  soloRankedRank: Rank;
};

type GetSummonerInfoError = {
  message: string;
  status: ContentfulStatusCode;
};

export const getSummonerInfo = async (
  name: string,
): Promise<Result<SummonerInfo, GetSummonerInfoError>> => {
  const riotId = parseRiotId(name);
  if (riotId === undefined) {
    return err({
      message: "Parameter 'id' is not in the correct format.",
      status: 400,
    });
  }

  const riotApi = await createRiotApi();

  const puuidResult = await riotApi.getPuuid(riotId);
  if (puuidResult.isErr()) {
    return err(puuidResult.error);
  }
  const puuid = puuidResult.value;

  const summonerDTOResult = await riotApi.getSummonerDTO(puuid);
  if (summonerDTOResult.isErr()) {
    return err(summonerDTOResult.error);
  }
  const summonerDTO = summonerDTOResult.value;

  const leagueEntriesDTOResult = await riotApi.getLeagueEntriesDTO(puuid);
  if (leagueEntriesDTOResult.isErr()) {
    return err(leagueEntriesDTOResult.error);
  }
  const leagueEntriesDTO = leagueEntriesDTOResult.value;
  const soloRanked = leagueEntriesDTO.find(
    (leagueEntry) => leagueEntry.queueType === "RANKED_SOLO_5x5",
  );
  const soloRankedRank: Rank = soloRanked
    ? joinRank(soloRanked.tier, soloRanked.rank)
    : "UNRANKED";

  return ok({
    summonerLevel: summonerDTO.summonerLevel,
    profileIconId: summonerDTO.profileIconId,
    soloRankedRank,
  });
};
