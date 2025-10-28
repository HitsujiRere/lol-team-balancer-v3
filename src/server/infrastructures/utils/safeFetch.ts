import {
  type Err,
  err,
  fromPromise,
  fromSafePromise,
  type ResultAsync,
} from "neverthrow";

export type NetworkError = {
  type: "network";
  error: Error;
};

type HttpError<E = unknown> = {
  type: "http";
  status: number;
  json?: E;
};

type ParseError = {
  type: "parse";
  error: Error;
};

type FetchError<E> = NetworkError | HttpError<E> | ParseError;

export const safeFetch = <T = unknown, E = unknown>(
  input: string | URL | Request,
  init?: RequestInit,
): ResultAsync<T, FetchError<E>> => {
  return fromPromise(
    fetch(input, init),
    (error): NetworkError => ({
      type: "network",
      error: error instanceof Error ? error : new Error(String(error)),
    }),
  ).andThen((res) => {
    if (!res.ok) {
      return fromSafePromise(res.json().catch(() => undefined)).andThen(
        (json): Err<T, HttpError<E>> =>
          err({
            type: "http",
            status: res.status,
            json: json as E,
          }),
      );
    }

    return fromPromise(
      res.json() as Promise<T>,
      (error): ParseError => ({
        type: "parse",
        error: error instanceof Error ? error : new Error(String(error)),
      }),
    );
  });
};
