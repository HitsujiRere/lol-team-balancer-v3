import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { formatRiotId, type RiotId } from "@/types/riotId";
import type { Summoner } from "@/types/summoner";
import { useRoomNamesStore } from "./useRoomNamesStore";

type State = {
  summoners: Record<string, Summoner | undefined>;
  getSummoner: (name: string) => Summoner;
  registerSummoners: (keys: (string | RiotId)[]) => void;
  changeSummoner: (
    name: string,
    changes: Partial<Omit<Summoner, "name">>,
  ) => void;
};

export const useSummonersStore = create<State>()(
  mutative((set, get) => ({
    summoners: {},
    getSummoner: (name) => {
      return (
        get().summoners[name] ?? {
          name,
          riotId: undefined,
          level: 0,
          iconId: undefined,
          rank: "UNRANKED",
          isMute: false,
          fetched: false,
        }
      );
    },
    registerSummoners: (keys) =>
      set((state) => {
        keys.forEach((key) => {
          const name = typeof key === "string" ? key : formatRiotId(key);
          if (!state.summoners[name]) {
            state.summoners[name] = {
              name,
              riotId: typeof key === "string" ? undefined : key,
              level: 0,
              iconId: undefined,
              rank: "UNRANKED",
              isMute: false,
              fetched: false,
            };
          }
        });
      }),
    changeSummoner: (name, changes) =>
      set((state) => {
        const current = state.getSummoner(name);
        state.summoners[name] = {
          name,
          riotId: changes.riotId ?? current.riotId,
          level: changes.level ?? current.level,
          iconId: changes.iconId ?? current.iconId,
          rank: changes.rank ?? current.rank,
          isMute: changes.isMute ?? current.isMute,
          fetched: changes.fetched ?? current.fetched,
        };
      }),
  })),
);

useRoomNamesStore.subscribe((roomState, _prev) =>
  useSummonersStore
    .getState()
    .registerSummoners([
      ...roomState.messageRiotIds,
      ...roomState.manualRiotIds,
      ...roomState.manualNames,
    ]),
);
