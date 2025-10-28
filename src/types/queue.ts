export const QUEUES = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR"] as const;

export type Queue = (typeof QUEUES)[number];
