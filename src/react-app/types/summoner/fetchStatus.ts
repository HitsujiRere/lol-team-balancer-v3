export const FETCH_STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  NOT_FOUND: "not_found",
  ERROR: "error",
} as const;

export type FetchStatuses = typeof FETCH_STATUSES;

export type FetchStatus = (typeof FETCH_STATUSES)[keyof typeof FETCH_STATUSES];
