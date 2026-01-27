import type { TeamName } from "../../../types/teamName";
import type { Formation } from "./formation";

export type Matchup = Record<TeamName, Formation>;

export const createEmptyMatchup = (): Matchup => ({
  blue: {
    top: undefined,
    jg: undefined,
    mid: undefined,
    bot: undefined,
    sup: undefined,
  },
  red: {
    top: undefined,
    jg: undefined,
    mid: undefined,
    bot: undefined,
    sup: undefined,
  },
});
