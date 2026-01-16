import { ok, type ResultAsync, safeTry } from "neverthrow";
import { joinRank, type Rank } from "#domain/rank";
import type { RiotId } from "#domain/riotId";
import type { ApiError } from "../domain/Error";
import type { RiotApi } from "../domain/RiotApi";

type Profile = {
  summonerLevel: number;
  profileIconId: number;
  soloRankedRank: Rank;
  soloRankedWins: number;
  soloRankedLosses: number;
};

export const getSummonerProfile = (
  riotId: RiotId,
  riotApi: RiotApi,
): ResultAsync<Profile, ApiError> => {
  return safeTry(async function* () {
    const puuid = yield* (await riotApi.getPuuid(riotId)).safeUnwrap();

    const summonerDTO = yield* (await riotApi.getSummoner(puuid)).safeUnwrap();

    const leagueEntriesDTO = yield* (
      await riotApi.getLeagueEntries(puuid)
    ).safeUnwrap();
    const soloRanked = leagueEntriesDTO.find(
      (leagueEntry) => leagueEntry.queueType === "RANKED_SOLO_5x5",
    );

    return ok({
      summonerLevel: summonerDTO.summonerLevel,
      profileIconId: summonerDTO.profileIconId,
      soloRankedRank: soloRanked
        ? joinRank(soloRanked.tier, soloRanked.rank)
        : "UNRANKED",
      soloRankedWins: soloRanked?.wins ?? 0,
      soloRankedLosses: soloRanked?.losses ?? 0,
    } satisfies Profile);
  });
};
