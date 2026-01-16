import { ok, type ResultAsync, safeTry } from "neverthrow";
import { joinRank, type Rank } from "#domain/rank";
import type { RiotId } from "#domain/riotId";
import type { ApiError } from "../domain/error";
import type { RiotApi } from "../domain/riotApi";

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

    const summoner = yield* (await riotApi.getSummoner(puuid)).safeUnwrap();

    const leagueEntries = yield* (
      await riotApi.getLeagueEntries(puuid)
    ).safeUnwrap();
    const soloRanked = leagueEntries.find(
      (entry) => entry.queueType === "RANKED_SOLO_5x5",
    );

    return ok({
      summonerLevel: summoner.summonerLevel,
      profileIconId: summoner.profileIconId,
      soloRankedRank: soloRanked
        ? joinRank(soloRanked.tier, soloRanked.rank)
        : "UNRANKED",
      soloRankedWins: soloRanked?.wins ?? 0,
      soloRankedLosses: soloRanked?.losses ?? 0,
    } satisfies Profile);
  });
};
