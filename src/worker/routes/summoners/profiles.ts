import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { riotIdSchema } from "#domain/riotId";
import { createRiotApi } from "../../infrastructures/riotApi";
import { getSummonerProfile } from "../../services/getSummonerProfile";
import { zValidatorHook } from "../utils/zValidatorHook";

const querySchema = z.object({
  ids: z
    .string()
    .transform((query, ctx) => {
      try {
        return JSON.parse(query);
      } catch (error) {
        ctx.addIssue({
          code: "custom",
          message: `Invalid JSON format: ${error}`,
        });
        return z.NEVER;
      }
    })
    .pipe(riotIdSchema.array()),
});

export const profilesApp = new Hono<{
  Bindings: Env;
}>().get("/", zValidator("query", querySchema, zValidatorHook), async (ctx) => {
  const ids = ctx.req.valid("query").ids;

  const riotApi = createRiotApi(ctx.env.RIOT_API_KEY);

  const res = await Promise.all(
    ids.map(async (id) => {
      const profile = await getSummonerProfile(id, riotApi);

      if (profile.isErr()) {
        const error = profile.error;
        return {
          success: false,
          error: error.message,
        } as const;
      }

      return {
        success: true,
        ...profile.value,
      } as const;
    }),
  );

  return ctx.json({ ids, res }, 200);
});
