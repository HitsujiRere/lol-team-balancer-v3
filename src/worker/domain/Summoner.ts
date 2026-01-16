import { z } from "zod";

export const summonerSchema = z.object({
  puuid: z.string(),
  profileIconId: z.number(),
  revisionDate: z.number(),
  summonerLevel: z.number(),
});

export type Summoner = z.infer<typeof summonerSchema>;
