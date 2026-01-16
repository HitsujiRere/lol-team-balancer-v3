import { okAsync } from "neverthrow";
import z from "zod";
import { isDebugRiotId, type RiotId } from "#domain/riotId";
import { dataNotFound, internalServerError } from "../../domain/error";
import { debugPuuId } from "../../domain/puuid";
import type { RiotApi } from "../../domain/riotApi";
import { safeFetch } from "../utils/safeFetch";
import { safeZodParse } from "../utils/safeZodParse";

const fetchSchema = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
});

export const getPuuid = (
  riotApiKey: string,
  riotId: RiotId,
): ReturnType<RiotApi["getPuuid"]> => {
  if (isDebugRiotId(riotId)) {
    return okAsync(debugPuuId);
  }

  return safeFetch(
    `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId.gameName}/${riotId.tagLine}`,
    { headers: { "X-Riot-Token": riotApiKey } },
  )
    .andThen(safeZodParse(fetchSchema))
    .mapErr((error) => {
      console.error(error);
      if (error.type === "http") {
        if (error.status === 404) {
          return dataNotFound();
        }
      }
      return internalServerError();
    })
    .map(({ puuid }) => puuid);
};
