import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { formatRiotId, type RiotId } from "@/types/riotId";
import { uniqued } from "@/utils/uniqued";

type State = {
  messageRiotIds: RiotId[];
  manualRiotIds: RiotId[];
  manualNames: string[];
  names: () => string[];
  riotIds: () => RiotId[];
  setMessageRiotIds: (riotIds: RiotId[]) => void;
  appendManualRiotIds: (names: RiotId[]) => void;
  appendManualNames: (names: string[]) => void;
  remove: (name: string) => void;
};

export const useRoomNamesStore = create<State>()(
  mutative((set, get) => ({
    messageRiotIds: [],
    manualRiotIds: [],
    manualNames: [],
    names: () =>
      uniqued([
        ...get().messageRiotIds.map((id) => formatRiotId(id)),
        ...get().manualRiotIds.map((id) => formatRiotId(id)),
        ...get().manualNames,
      ]),
    riotIds: () => uniqued([...get().messageRiotIds, ...get().manualRiotIds]),
    setMessageRiotIds: (riotIds) =>
      set((state) => {
        state.messageRiotIds = riotIds;
      }),
    appendManualRiotIds: (riotIds) =>
      set((state) => {
        state.manualRiotIds.push(...riotIds);
      }),
    appendManualNames: (names) =>
      set((state) => {
        state.manualNames.push(...names);
      }),
    remove: (removeName) =>
      set((state) => {
        state.messageRiotIds = state.messageRiotIds.filter(
          (riotId) => formatRiotId(riotId) !== removeName,
        );
        state.manualRiotIds = state.manualRiotIds.filter(
          (riotId) => formatRiotId(riotId) !== removeName,
        );
        state.manualNames = state.manualNames.filter(
          (name) => name !== removeName,
        );
      }),
  })),
);
