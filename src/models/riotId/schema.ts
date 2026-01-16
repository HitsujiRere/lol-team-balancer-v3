import { z } from "zod";

export const riotIdSchema = z.object({
  gameName: z.string(),
  tagLine: z.string(),
});
