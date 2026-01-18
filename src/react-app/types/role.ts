export const ROLES = ["top", "jg", "mid", "bot", "sup"] as const;

export type Role = (typeof ROLES)[number];
