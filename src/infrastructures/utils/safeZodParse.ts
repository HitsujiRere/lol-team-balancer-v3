import { err, ok, type Result } from "neverthrow";
import type { ZodError, ZodType, z } from "zod";

type ZodParseError<T> = {
  type: "zod";
  error: ZodError<T>;
};

export const safeZodParse =
  <TSchema extends ZodType>(schema: TSchema) =>
  (
    data: unknown,
  ): Result<z.infer<TSchema>, ZodParseError<z.infer<TSchema>>> => {
    const result = schema.safeParse(data);
    return result.success
      ? ok(result.data)
      : err({
          type: "zod",
          error: result.error,
        });
  };
