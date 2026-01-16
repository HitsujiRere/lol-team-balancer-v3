import type { Hook } from "@hono/zod-validator";
import type { Env } from "hono";

export const zValidatorHook = ((result, c) => {
  if (!result.success) {
    return c.json(
      {
        type: "Zod error",
        errors: result.error.issues,
      },
      400,
    );
  }
}) satisfies Hook<unknown, Env, string>;
