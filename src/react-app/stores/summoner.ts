import { atom } from "jotai/vanilla";
import { atomFamily } from "jotai-family";
import { atomWithImmer } from "jotai-immer";
import type { Summoner } from "../types/summoner";

export const summonersAtom = atomWithImmer<Record<string, Summoner>>({});

export const summonerFamily = atomFamily((name: string) =>
  atom(
    (get) => get(summonersAtom)[name],
    (get, set, arg: (summoner: Summoner) => Summoner) => {
      if (get(summonersAtom)[name]) {
        set(summonersAtom, (draft) => {
          draft[name] = arg(draft[name]);
        });
      }
    },
  ),
);
