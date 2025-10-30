export const TEAMS = ["Blue", "Red"] as const;

export type Team = (typeof TEAMS)[number];
