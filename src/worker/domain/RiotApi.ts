import type { ResultAsync } from "neverthrow";
import type { RiotId } from "#domain/riotId";
import type { DataNotFound, InternalServerError } from "./Error";
import type { LeagueEntries } from "./LeagueEntry";
import type { Summoner } from "./Summoner";

export type RiotApi = {
  getPuuid: (
    riotId: RiotId,
  ) => ResultAsync<string, DataNotFound | InternalServerError>;

  getSummoner: (
    puuid: string,
  ) => ResultAsync<Summoner, DataNotFound | InternalServerError>;

  getLeagueEntries: (
    puuid: string,
  ) => ResultAsync<LeagueEntries, DataNotFound | InternalServerError>;
};
