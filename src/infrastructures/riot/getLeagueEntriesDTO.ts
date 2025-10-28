import type { ContentfulStatusCode } from "hono/utils/http-status";
import { okAsync, type ResultAsync } from "neverthrow";
import z from "zod";
import { logger } from "@/server/logger";
import { QUEUES } from "@/types/queue";
import { RANK_NUMBERS, TIERS } from "@/types/rank";
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
  status: ContentfulStatusCode;
};

export const getLeagueEntriesDTO = (
  riotApiKey: string,
  puuid: string,
): ResultAsync<LeagueEntriesDTO, GetLeagueEntriesDTOError> => {
  if (puuid === "debug_puuid") {
    return okAsync([]);
  }

  return safeFetch(
    `https://jp1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": riotApiKey } },
  )
    .andThen(safeZodParse(schema))
    .mapErr((error): GetLeagueEntriesDTOError => {
      logger.error(error);
      return {
        message: "Internal server error",
        status: 500,
      };
    })
    .map((res) => res);
};
