import { okAsync } from "neverthrow";
import { RANK_NUMBERS, TIERS } from "#domain/rank";
import { dataNotFound, internalServerError } from "../../domain/Error";
import { leagueEntriesSchema } from "../../domain/LeagueEntry";
import type { RiotApi } from "../../domain/RiotApi";
import { DebugPuuId } from "../../types/puuid";
import { choice } from "../../utils/choice";
import { randomInt } from "../../utils/random";
import { safeFetch } from "../utils/safeFetch";
import { safeZodParse } from "../utils/safeZodParse";

export const getLeagueEntries = (
  riotApiKey: string,
  puuid: string,
): ReturnType<RiotApi["getLeagueEntries"]> => {
  if (puuid === DebugPuuId) {
    return okAsync([
      {
        leagueId: "debug_league_id",
        queueType: "RANKED_SOLO_5x5",
        tier: choice(TIERS),
        rank: choice(RANK_NUMBERS),
        leaguePoints: randomInt(0, 99),
        wins: randomInt(1, 100),
        losses: randomInt(1, 100),
        veteran: choice([true, false]),
        inactive: choice([true, false]),
        freshBlood: choice([true, false]),
        hotStreak: choice([true, false]),
      },
    ]);
  }

  return safeFetch(
    `https://jp1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": riotApiKey } },
  )
    .andThen(safeZodParse(leagueEntriesSchema))
    .andTee((entries) => console.log(entries))
    .mapErr((error) => {
      console.error(error);
      if (error.type === "http") {
        if (error.status === 404) {
          return dataNotFound();
        }
      }
      return internalServerError();
    })
    .map((res) => res);
};
