import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { riotIdSchema } from "#domain/riotId";
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

export const profilesApi = new Hono<{
  Bindings: Env;
}>().get("/", zValidator("query", querySchema, zValidatorHook), async (c) => {
  const ids = c.req.valid("query").ids;

  return c.json({ ids }, 200);
});
