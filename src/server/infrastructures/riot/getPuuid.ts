import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";
import { okAsync, type ResultAsync } from "neverthrow";
import z from "zod";
import { logger } from "@/server/logger";
import type { RiotId } from "@/types/riotId";
import { safeFetch } from "../utils/safeFetch";
import { safeZodParse } from "../utils/safeZodParse";

const schema = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
});

export type GetPuuidError = {
  message: string;
  status: ClientErrorStatusCode | ServerErrorStatusCode;
};

export const getPuuid = (
  riotApiKey: string,
  riotId: RiotId,
): ResultAsync<string, GetPuuidError> => {
  if (riotId.tagLine === "DEBUG") {
    return okAsync("debug_puuid");
  }

  return safeFetch(
    `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId.gameName}/${riotId.tagLine}`,
    { headers: { "X-Riot-Token": riotApiKey } },
  )
    .andThen(safeZodParse(schema))
    .mapErr((error): GetPuuidError => {
      logger.error(error);
      if (error.type === "http") {
        if (error.status === 404) {
          return {
            message: "Data not found",
            status: 404,
          };
        }
      }
      return {
        message: "Internal server error",
        status: 500,
      };
    })
    .map((res) => res.puuid);
};
