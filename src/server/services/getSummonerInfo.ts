import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";
import { err, ok, type ResultAsync, safeTry } from "neverthrow";
import { joinRank, type Rank } from "@/types/rank";
import { parseRiotId } from "@/types/riotId";
import { createRiotApi } from "../infrastructures/riot";

type SummonerInfo = {
  summonerLevel: number;
  profileIconId: number;
  soloRankedRank: Rank;
};

type GetSummonerInfoError = {
  message: string;
  status: ClientErrorStatusCode | ServerErrorStatusCode;
};

export const getSummonerInfo = (
  name: string,
): ResultAsync<SummonerInfo, GetSummonerInfoError> => {
  return safeTry(async function* () {
    const riotId = parseRiotId(name);
    if (riotId === undefined) {
      return err({
        message: "Parameter 'id' is not in the correct format.",
        status: 400,
      } satisfies GetSummonerInfoError);
    }

    const riotApi = await createRiotApi();

    const puuid = yield* (await riotApi.getPuuid(riotId)).safeUnwrap();

    const summonerDTO = yield* (
      await riotApi.getSummonerDTO(puuid)
    ).safeUnwrap();

    const leagueEntriesDTO = yield* (
      await riotApi.getLeagueEntriesDTO(puuid)
    ).safeUnwrap();
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
  });
};
