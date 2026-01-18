export const TEAM_NAMES = ["blue", "red"] as const;

export type TeamName = (typeof TEAM_NAMES)[number];
