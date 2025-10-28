import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";
import { okAsync, type ResultAsync } from "neverthrow";
import z from "zod";
import { logger } from "@/server/logger";
import { QUEUES } from "@/types/queue";
import { RANK_NUMBERS, TIERS } from "@/types/rank";
import { choice } from "@/utils/choice";
import { randomBetween } from "@/utils/random";
import { safeFetch } from "../utils/safeFetch";
import { safeZodParse } from "../utils/safeZodParse";

const schema = z.array(
  z.object({
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
  }),
);

export type LeagueEntriesDTO = z.infer<typeof schema>;
export type LeagueEntryDTO = LeagueEntriesDTO[number];

export type GetLeagueEntriesDTOError = {
  message: string;
  status: ClientErrorStatusCode | ServerErrorStatusCode;
};

export const getLeagueEntriesDTO = (
  riotApiKey: string,
  puuid: string,
): ResultAsync<LeagueEntriesDTO, GetLeagueEntriesDTOError> => {
  if (puuid === "debug_puuid") {
    return okAsync([
      {
        leagueId: "debug_league_id",
        queueType: "RANKED_SOLO_5x5",
        tier: choice(TIERS),
        rank: choice(RANK_NUMBERS),
        leaguePoints: randomBetween(0, 99),
        wins: randomBetween(1, 100),
        losses: randomBetween(1, 100),
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
    .andThen(safeZodParse(schema))
    .andTee((entries) => console.log(entries))
    .mapErr((error): GetLeagueEntriesDTOError => {
      logger.error(error);
      return {
        message: "Internal server error",
        status: 500,
      };
    })
    .map((res) => res);
};
