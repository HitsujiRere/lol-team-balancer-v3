import { create } from "zustand";
import { mutative } from "zustand-mutative";
import type { Summoner } from "@/types/summoner";

type State = {
  summoners: Map<string, Summoner>;
};

export const useSummonersStore = create<State>()(
  mutative((_set, _get) => ({
    summoners: new Map(),
  })),
);
