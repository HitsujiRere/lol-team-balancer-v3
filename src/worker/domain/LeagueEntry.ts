import { z } from "zod";
import { RANK_NUMBERS, TIERS } from "#domain/rank";
import { QUEUES } from "./Queue";

export const leagueEntriesSchema = z
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

export type LeagueEntries = z.infer<typeof leagueEntriesSchema>;
export type LeagueEntry = LeagueEntries[number];
