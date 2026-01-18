export const PRIORITIES = {
  lock: "lock",
  high: "high",
  medium: "medium",
  low: "low",
  never: "never",
} as const;

export type Priorities = typeof PRIORITIES;

export type Priority = Priorities[keyof Priorities];
