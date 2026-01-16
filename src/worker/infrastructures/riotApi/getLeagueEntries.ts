import { okAsync } from "neverthrow";
import z from "zod";
import { RANK_NUMBERS, TIERS } from "#domain/rank";
import { dataNotFound, internalServerError } from "../../domain/error";
import { debugPuuId, type Puuid } from "../../domain/puuid";
import { QUEUES } from "../../domain/queue";
import type { RiotApi } from "../../domain/riotApi";
import { choice } from "../../utils/choice";
import { randomInt } from "../../utils/random";
import { safeFetch } from "../utils/safeFetch";
import { safeZodParse } from "../utils/safeZodParse";

export const fetchSchema = z
  .object({
    leagueId: z.string(),
    queueType: z.enum(QUEUES),
    tier: z.enum(TIERS),
    rank: z.enum(RANK_NUMBERS),
    leaguePoints: z.number(),
    wins: z.number(),
    losses: z.number(),
    veteran: z.boolean(),
    inactive: z.boolean(),
    freshBlood: z.boolean(),
    hotStreak: z.boolean(),
  })
  .array();

export const getLeagueEntries = (
  riotApiKey: string,
  puuid: Puuid,
): ReturnType<RiotApi["getLeagueEntries"]> => {
  if (puuid === debugPuuId) {
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
    .andThen(safeZodParse(fetchSchema))
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
    .map((res) =>
      res.map((entry) => ({
        leagueId: entry.leagueId,
        queueType: entry.queueType,
        tier: entry.tier,
        rank: entry.rank,
        leaguePoints: entry.leaguePoints,
        wins: entry.wins,
        losses: entry.losses,
        veteran: entry.veteran,
        inactive: entry.inactive,
        freshBlood: entry.freshBlood,
        hotStreak: entry.hotStreak,
      })),
    );
};
