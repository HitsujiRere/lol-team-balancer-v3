import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { formatRiotId, type RiotId } from "@/types/riotId";
import { createSummoner, type Summoner } from "@/types/summoner";
import { useRoomNamesStore } from "./useRoomNamesStore";

type State = {
  summoners: Record<string, Summoner>;
  registerSummoners: (keys: (string | RiotId)[]) => void;
  changeSummoner: (
    name: string,
    changes: Partial<Omit<Summoner, "name">>,
  ) => void;
};

export const useSummonersStore = create<State>()(
  mutative((set, _get) => ({
    summoners: {},
    registerSummoners: (keys) =>
      set((state) => {
        keys.forEach((key) => {
          const name = typeof key === "string" ? key : formatRiotId(key);
          if (!state.summoners[name]) {
            state.summoners[name] = createSummoner(name, {
              riotId: typeof key !== "string" ? key : undefined,
            });
          }
        });
      }),
    changeSummoner: (name, changes) =>
      set((state) => {
        const current = state.summoners[name] ?? createSummoner(name);
        state.summoners[name] = {
          name,
          riotId: changes.riotId ?? current.riotId,
          level: changes.level ?? current.level,
          iconId: changes.iconId ?? current.iconId,
          rank: changes.rank ?? current.rank,
          isMute: changes.isMute ?? current.isMute,
          fetchStatus: changes.fetchStatus ?? current.fetchStatus,
          rankWins: changes.rankWins ?? current.rankWins,
          rankLosses: changes.rankLosses ?? current.rankLosses,
          lockTeam: changes.lockTeam ?? current.lockTeam,
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
